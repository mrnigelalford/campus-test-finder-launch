
import { Check, MapPin, FileText } from "lucide-react";

const howItWorks = [
  {
    icon: <Check size={48} className="mx-auto text-[#6941C6]" />,
    title: "Select Test",
    description: "Choose one of 1,200 lab & radiology tests available"
  },
  {
    icon: <MapPin size={48} className="mx-auto text-[#6941C6]" />,
    title: "Get Tested",
    description: "Enter your zip code and choose a lab or radiology center near you"
  },
  {
    icon: <FileText size={48} className="mx-auto text-[#6941C6]" />,
    title: "View Results",
    description: "Review your health information anytime, anywhere"
  }
];

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="w-full py-20 bg-[#fcfbff] flex flex-col items-center"
  >
    <h3 className="text-lg font-semibold text-[#6941C6] text-center mb-2">
      How it works
    </h3>
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
      Living healthy starts here
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
      {howItWorks.map((step, i) => (
        <div className="flex flex-col items-center text-center px-4" key={step.title}>
          <div className="flex items-center justify-center mb-4">{step.icon}</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
          <p className="text-gray-700 text-base">{step.description}</p>
          {i < 2 && (
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
