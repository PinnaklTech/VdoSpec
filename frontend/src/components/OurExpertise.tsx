

// import { useState } from "react";
// import { ExternalLink } from "lucide-react";

// const expertise = [
//   {
//     logo: "/asme_logo.png", // Path to ASME logo
//     title: "American Society of Mechanical Engineers (ASME)",
//     description:
//       "A global organization advancing the engineering profession through knowledge, collaboration, and innovation.",
//     link: "https://www.asme.org/",
//   },
//   {
//     logo: "/api_logo.png", // Path to API logo
//     title: "American Petroleum Institute (API)",
//     description:
//       "Setting standards for the oil and natural gas industry to ensure safety, environmental protection, and efficiency.",
//     link: "https://www.api.org/",
//   },
//   {
//     logo: "/sae_logo.png", // Path to SAE logo
//     title: "Society of Automotive Engineers (SAE)",
//     description:
//       "A professional association for engineers in the automotive, aerospace, and commercial vehicle industries.",
//     link: "https://www.sae.org/",
//   },
//   {
//     logo: "/asnt_logo.png", // Path to ASNT logo
//     title: "American Society of Non-Destructive Testing (ASNT)",
//     description:
//       "The world’s largest technical society for nondestructive testing professionals.",
//     link: "https://www.asnt.org/",
//   },
//   {
//     logo: "/aes_logo.png", // Path to AWS logo
//     title: "American Welding Society (AWS)",
//     description:
//       "Advancing the science, technology, and application of welding and allied joining disciplines.",
//     link: "https://www.aws.org/",
//   },
// ];


// export function Expertise() {
//   return (
//     <section id="expertise" className="py-10 px-6">
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
//           Our Expertise
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
//           Our team specializes in multiple industry standards, ensuring accurate and reliable solutions.
//         </p>
//       </div>

//       {/* Centered Bigger Cards */}
//       <div className="max-w-3xl mx-auto mt-10 flex flex-col items-center gap-6">
//         {expertise.map((field, index) => (
//           <a
//             key={index}
//             href={field.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="relative flex items-center w-full max-w-xl p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {/* External Link Arrow in Top-Right */}
//             <ExternalLink className="absolute top-4 right-4 h-6 w-6 text-blue-500" />

//             {/* Logo */}
//             <img src={field.logo} alt={field.title} className="h-16 w-16 mr-5" />

//             {/* Text Content */}
//             <div>
//               <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
//                 {field.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 text-base">
//                 {field.description}
//               </p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";

const expertise = [
  {
    logo: "/asme_logo.png",
    title: "American Society of Mechanical Engineers (ASME)",
    description:
      "A global organization advancing the engineering profession through knowledge, collaboration, and innovation.",
    link: "https://www.asme.org/",
  },
  {
    logo: "/api_logo.png",
    title: "American Petroleum Institute (API)",
    description:
      "Setting standards for the oil and natural gas industry to ensure safety, environmental protection, and efficiency.",
    link: "https://www.api.org/",
  },
  {
    logo: "/sae_logo.png",
    title: "Society of Automotive Engineers (SAE)",
    description:
      "A professional association for engineers in the automotive, aerospace, and commercial vehicle industries.",
    link: "https://www.sae.org/",
  },
  {
    logo: "/asnt_logo.png",
    title: "American Society of Non-Destructive Testing (ASNT)",
    description:
      "The world's largest technical society for nondestructive testing professionals.",
    link: "https://www.asnt.org/",
  },
  {
    logo: "/aes_logo.png",
    title: "American Welding Society (AWS)",
    description:
      "Advancing the science, technology, and application of welding and allied joining disciplines.",
    link: "https://www.aws.org/",
  },
];

export function Expertise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="expertise" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Expertise
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our team specializes in multiple industry standards, ensuring accurate and reliable solutions 
            for your engineering needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {expertise.map((field, index) => (
            <a
              key={index}
              href={field.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg
                transition-all duration-300 ease-in-out
                ${hoveredIndex === index ? 'scale-[1.02] shadow-xl' : ''}
                border border-gray-100 hover:border-blue-100
              `}>
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform origin-left transition-all duration-300 ease-in-out"
                  style={{
                    transform: hoveredIndex === index ? 'scaleX(4)' : 'scaleX(1)'
                  }}
                ></div>

                <div className="flex items-center gap-8">
                  {/* Logo with subtle hover animation */}
                  <div className="relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-xl p-3
                    transition-transform duration-300 group-hover:scale-110">
                    <img 
                      src={field.logo} 
                      alt={field.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {field.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-blue-500 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <p className="text-gray-600">
                      {field.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <ChevronRight className={`
                    flex-shrink-0 w-6 h-6 text-blue-500
                    transform transition-all duration-300
                    ${hoveredIndex === index ? 'translate-x-2 scale-110' : ''}
                  `} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}