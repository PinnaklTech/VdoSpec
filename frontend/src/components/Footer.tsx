// import { Mail } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="py-6 border-t border-gray-300 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center space-y-3">
//           <p className="text-gray-600 dark:text-gray-400 text-sm">
//             © {new Date().getFullYear()} All rights reserved.
//           </p>

          

//           {/* Contact Info */}
//           <div className="flex justify-center items-center gap-2">
//             <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//             <a
//               href="mailto:company@outlook.com"
//               className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
//             >
//               company@outlook.com
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
// import { Mail } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// export function Footer() {
//   return (
//     <footer className="py-10 border-t border-gray-300 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
//         {/* Left Section - Copyright & Links */}
//         <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
//           <p>© {new Date().getFullYear()} <span className="font-semibold">All rights reserved</span></p>
//           <a href="#" className="hover:underline">Privacy Policy</a>
//           <a href="#" className="hover:underline">Terms of Service</a>
//         </div>

//         {/* Center Section - Call-to-Action Button (Updated Colors) */}
//         <Link
//             to="/get-started"
//             className="mt-8 inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-[#4B6FBF] rounded-lg shadow-lg hover:bg-[#3A5CAB] hover:shadow-xl transition-all duration-200 group"
//           >
//             Get Started!
//             <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//           </Link>

//         {/* Right Section - Email Icon */}
//         <div className="flex items-center space-x-2">
//           <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//           <a
//             href="mailto:company@outlook.com"
//             className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
//           >
//             Vspec@outlook.com
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { Mail, ArrowRight, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        
        {/* Left Section - Copyright & Links */}
        <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <p>© {new Date().getFullYear()} <span className="font-semibold">All rights reserved</span></p>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>

        {/* Center Section - Call-to-Action Button */}
        <Link
          to="/get-started"
          className="mt-8 inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-[#4B6FBF] rounded-lg shadow-lg hover:bg-[#3A5CAB] hover:shadow-xl transition-all duration-200 group"
        >
          Get Started!
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Right Section - Email & Scroll to Top Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <a
              href="mailto:V.spec@outlook.com"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
            >
              V.spec@outlook.com
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="ml-6 p-2 rounded-full transition-all"
            title="Scroll to Top"
          >
            <ChevronUp className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}
