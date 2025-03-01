
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export function Hero() {
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   return (
//     <div id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 text-left lg:text-left">
//       {/* Left Content (Text) */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 max-w-2xl lg:w-1/2"
//       >
//         {/* Badge */}
//         <motion.div
//           {...fadeIn}
//           className="inline-flex items-center bg-[#d6e5ff] dark:bg-[#2A4D8C]/30 rounded-full px-3 py-1 text-sm font-medium mb-6"
//         >
//           <span className="text-[#2A4D8C] dark:text-[#9FB5E2]">New</span>
//           <span className="ml-2 text-[#4A5E87] dark:text-[#C1D0F0]">
//             Discover our latest specification updates
//           </span>
//         </motion.div>

//         {/* Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-4xl sm:text-6xl font-bold text-[#2A4D8C] dark:text-[#A8C0F0]"
//         >
//           <span className="text-[#4B6FBF] dark:text-[#BDD0FF]">V-Spec</span>
//           <span className="block text-[#1F3A67] dark:text-[#DEE9FF] mt-2">
//             Your go-to resource for manufacturing specifications
//           </span>
//         </motion.h1>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="text-lg text-[#4A5E87] dark:text-[#C1D0F0] mt-6 max-w-2xl"
//         >
//           Providing expert answers and insights on ASTM, AWS, ASME, and more. Simplifying industry
//           standards for engineers, manufacturers, and professionals.
//         </motion.p>

//         {/* CTA Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <Link
//             to="/get-started"
//             className="mt-8 inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-[#4B6FBF] rounded-lg shadow-lg hover:bg-[#3A5CAB] hover:shadow-xl transition-all duration-200 group"
//           >
//             Get Started!
//             <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//           </Link>
//         </motion.div>
//       </motion.div>

//       {/* Right Side (Image) */}
//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         className="lg:w-1/2 flex justify-center mt-10 lg:mt-0"
//       >
//         <img
//           src="/Document Picture.png"
//           alt="Document Illustration"
//           className="w-full max-w-md lg:max-w-lg"
//         />
//       </motion.div>

//       {/* Background Pattern */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-[#f3f8ff] via-[#deecff] to-[#c6cfff]"
//       >
//         <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
//       </motion.div>
//     </div>
//   );
// }
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 pt-32 text-center lg:text-left"
    >
      {/* Left Content (Text) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl lg:w-1/2 lg:mt-12"
      >
        {/* Badge */}
        <motion.div
          {...fadeIn}
          className="inline-flex items-center bg-[#d6e5ff] dark:bg-[#2A4D8C]/30 rounded-full px-3 py-1 text-sm font-medium mb-6"
        >
          <span className="text-[#2A4D8C] dark:text-[#9FB5E2]">New</span>
          <span className="ml-2 text-[#4A5E87] dark:text-[#C1D0F0]">
            Discover our latest specification updates
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeIn}
          className="text-3xl sm:text-5xl font-bold text-[#2A4D8C] dark:text-[#A8C0F0]"
        >
          <span className="text-[#4B6FBF] dark:text-[#BDD0FF]">Vdospec</span>
          <span className="block text-[#1F3A67] dark:text-[#DEE9FF] mt-2">
            Your go-to resource for manufacturing specifications
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeIn}
          className="text-lg text-[#4A5E87] dark:text-[#C1D0F0] mt-6 max-w-2xl"
        >
          Providing expert answers and insights on ASTM, AWS, ASME, and more.
        </motion.p>

        {/* CTA Button */}
        <motion.div {...fadeIn}>
          <Link
            to="/get-started"
            className="mt-6 inline-flex items-center px-5 py-3 text-lg font-medium text-white bg-[#4B6FBF] rounded-lg shadow-lg hover:bg-[#3A5CAB] hover:shadow-xl transition-all"
          >
            Get Started!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side (Image) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="lg:w-1/2 flex justify-center mt-14 lg:mt-0"
      >
        <img
          src="/Document Picture.png"
          alt="Document Illustration"
          className="w-full max-w-md sm:max-w-lg"
        />
      </motion.div>
    </div>
  );
}
