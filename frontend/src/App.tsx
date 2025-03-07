
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Expertise } from "./components/OurExpertise";
import { Footer } from "./components/Footer";
import GetStarted from "./pages/GetStarted";

function App() {
  return (
    <Router>
      {/* Apply new background gradient with blobs */}
      <div className="relative min-h-screen bg-white dark:bg-[#101010] overflow-hidden">

        
        {/* Random Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full opacity-30 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-20 w-64 h-64 bg-purple-300 rounded-full opacity-40 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-16 left-1/3 w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl mix-blend-multiply"></div>

        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Features />
                <Expertise/>
              </main>
            }
          />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
