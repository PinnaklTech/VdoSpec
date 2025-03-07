
import { Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const GetStarted = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const formatPhoneNumber = (number: string) => {
    let formattedNumber = number.replace(/\D/g, '');
    if (countryCode === '+1') {
      if (formattedNumber.length > 3 && formattedNumber.length <= 6) {
        formattedNumber = `(${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(3)}`;
      } else if (formattedNumber.length > 6) {
        formattedNumber = `(${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 10)}`;
      }
    } else if (countryCode === '+91') {
      if (formattedNumber.length > 5) {
        formattedNumber = `${formattedNumber.slice(0, 5)}-${formattedNumber.slice(5, 10)}`;
      }
    }
    return formattedNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    if (!name || !email || !message) {
      setPopup({ type: 'error', message: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    const fullPhoneNumber = `${countryCode} ${phoneNumber.replace(/\D/g, '')}`;
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    if (phoneNumber) formData.append('phone', fullPhoneNumber);
    formData.append('message', message);

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setPopup({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });

      // Reset form after submission
      setFile(null);
      setName('');
      setEmail('');
      setCountryCode('+1');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      setPopup({ type: 'error', message: 'There was an error sending your message. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="py-32 w-full">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="relative bg-white rounded-2xl p-10 shadow-xl min-h-[600px] flex flex-col justify-center">
            <div className="relative">
              <h2 className="text-4xl font-bold text-center text-blue-600 mb-2">
                Ask us any Questions
              </h2>
              <p className="text-center text-gray-600 mb-10">
                We're here to help! Fill out the form below and we'll get back to you.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-lg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex gap-3">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-lg"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-lg"
                      
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Upload File</label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {file ? (
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 mb-1">Drag and drop your file here, or click to select</p>
                        <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Query</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black text-lg resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 text-xl font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {loading && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 overflow-hidden">
                      <div className="h-full w-[200%] bg-blue-500 animate-loading"></div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {popup && (
        <div 
          className={`fixed bottom-5 right-5 max-w-md transform transition-all duration-500 ease-in-out ${
            popup ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className={`
            flex items-center gap-3 p-6 rounded-xl shadow-2xl backdrop-blur-lg
            ${popup.type === 'success' 
              ? 'bg-blue-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}>
            <div className="flex-shrink-0">
              {popup.type === 'success' ? (
                <CheckCircle className="w-6 h-6 animate-bounce" />
              ) : (
                <AlertCircle className="w-6 h-6 animate-pulse" />
              )}
            </div>
            <p className="text-sm font-medium">{popup.message}</p>
            <button
              onClick={() => setPopup(null)}
              className="ml-auto flex-shrink-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;