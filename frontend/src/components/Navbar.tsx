// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ThemeToggle } from "./ThemeToggle";

// export function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isHomePage = location.pathname === "/";

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (id: string) => {
//     const section = document.getElementById(id);
//     if (section) {
//       setTimeout(() => {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       }, 100);
//     }
//   };

//   const handleNavigation = (id: string) => {
//     if (isHomePage) {
//       scrollToSection(id);
//     } else {
//       navigate("/", { state: { scrollTo: id } });
//     }
//   };

//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       scrollToSection(location.state.scrollTo);
//     }
//   }, [location]);

//   return (
//     <nav
//       className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full w-[90%] max-w-3xl px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-800 ${
//         isScrolled
//           ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl"
//           : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
//       }`}
//     >
//       <div className="flex items-center justify-between">
//         {/* Left Side: Logo & Home Button */}
//         <div className="flex items-center gap-4">
//           <button onClick={() => handleNavigation("hero")}>
//             <img
//               src="/logo.png"
//               alt="V-Spec Logo"
//               className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
//             />
//           </button>
//           <button
//             onClick={() => handleNavigation("hero")}
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
//           >
//             Home
//           </button>
//         </div>

//         {/* Right Side: Navbar Links & Theme Toggle */}
//         <div className="flex items-center gap-8">
//           {isHomePage && (
//             <>
//               <button
//                 onClick={() => scrollToSection("features")}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
//               >
//                 Features
//               </button>
//               <button
//                 onClick={() => scrollToSection("expertise")}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
//               >
//                 Our Expertise
//               </button>
//             </>
//           )}
//           <ThemeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
  };

  const handleNavigation = (id: string) => {
    if (isHomePage) {
      scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigating
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
    }
  }, [location]);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full w-[90%] max-w-3xl px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-800 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl"
          : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side: Logo & Home Button */}
        <div className="flex items-center gap-4">
          <button onClick={() => handleNavigation("hero")}>
            <img
              src="/logo.png"
              alt="V-Spec Logo"
              className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
            />
          </button>
          <button
            onClick={() => handleNavigation("hero")}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium hidden sm:block"
          >
            Home
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="sm:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("features")}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("expertise")}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Our Expertise
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg mt-3 shadow-lg sm:hidden">
          <button
            onClick={() => handleNavigation("hero")}
            className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("features")}
            className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("expertise")}
            className="block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Our Expertise
          </button>
          <div className="px-6 py-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
