from fastapi import FastAPI, UploadFile, File, Form
from sentence_transformers import SentenceTransformer
import pdfplumber
import mammoth
import chromadb
from typing import List
import uuid
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter

app = FastAPI()
model = SentenceTransformer("BAAI/bge-base-en-v1.5")

chroma_client = chromadb.PersistentClient(path="./chroma_store")

COLLECTION_NAME = "rag_chunks"
collection = chroma_client.get_or_create_collection(COLLECTION_NAME)


# Utility: Extract text from PDF
def extract_pdf_text(file):
    with pdfplumber.open(file) as pdf:
        return "\n".join([page.extract_text() or '' for page in pdf.pages])


# Utility: Extract text from DOCX
def extract_docx_text(file):
    result = mammoth.convert_to_text(file)
    return result.value


# Utility: Chunk text using LangChain's RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,  # characters
    chunk_overlap=200
)

def chunk_text(text: str):
    return splitter.split_text(text)


@app.post("/upload")
async def upload_document(file: UploadFile = File(...), doc_id: str = Form(...)):
    ext = os.path.splitext(file.filename)[1].lower()

    if ext == ".pdf":
        text = extract_pdf_text(file.file)
    elif ext in [".docx", ".doc"]:
        text = extract_docx_text(file.file)
    else:
        return {"error": "Unsupported file type"}

    chunks = chunk_text(text)

    # Prefix each chunk with 'passage: '
    prefixed_chunks = [f"passage: {chunk}" for chunk in chunks]

    # Token count check (using model tokenizer)
    total_tokens = sum(len(model.tokenizer.tokenize(chunk)) for chunk in prefixed_chunks)
    MAX_TOTAL_TOKENS = 6000  # Lowered from 12000 for extra safety
    if total_tokens > MAX_TOTAL_TOKENS:
        return {"error": "This document is too large for analysis. Please upload a smaller document or split it into parts.", "total_tokens": total_tokens}

    embeddings = model.encode(prefixed_chunks).tolist()

    ids = [str(uuid.uuid4()) for _ in range(len(prefixed_chunks))]
    metadatas = [{"doc_id": doc_id, "chunk_index": i} for i in range(len(prefixed_chunks))]

    collection.add(documents=prefixed_chunks, embeddings=embeddings, ids=ids, metadatas=metadatas)

    return {"message": "Document processed and stored", "chunks": len(chunks), "total_tokens": total_tokens}


@app.post("/retrieve")
async def retrieve(query: str = Form(...), k: int = Form(3)):
    # Prefix the query with 'query: '
    prefixed_query = f"query: {query}"
    query_embedding = model.encode([prefixed_query])[0].tolist()
    results = collection.query(query_embeddings=[query_embedding], n_results=k)
    top_chunks = results['documents'][0]
    return {"top_chunks": top_chunks}
