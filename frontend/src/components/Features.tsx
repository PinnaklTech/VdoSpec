import { FileText, Brain, MessageCircle, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document-Based Answers",
    description: "Send us your specifications, and our team will analyze them efficiently.",
  },
  {
    icon: Brain,
    title: "Expert Insights",
    description: "Get precise responses from industry professionals with deep knowledge.",
  },
  {
    icon: MessageCircle,
    title: "Seamless Communication",
    description: "Receive clear, detailed answers tailored to your requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Confidential",
    description: "Your documents are handled with enterprise-grade security and privacy.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Why Choose V-Spec?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Accurate, efficient, and expert-backed responses to your specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
            >
              <feature.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
