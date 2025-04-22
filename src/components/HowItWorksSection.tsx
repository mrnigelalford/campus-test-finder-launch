
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Search by Test",
    description: "Find your required medical test by typing the test name and location."
  },
  {
    number: 2,
    title: "Choose Facility",
    description: "Browse results and choose a location based on distance, rating, and turnaround time."
  },
  {
    number: 3,
    title: "Book & Get Tested",
    description: "Book your appointment online and get tested at your chosen facility."
  }
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 bg-gradient-to-r from-[#F9F5FF] to-[#EBE4FF] rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        LabFinder makes it easy to find and book medical testing near your campus. Just follow these three simple steps:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {steps.map(step => (
          <div key={step.number} className="bg-white rounded-xl shadow p-8 flex flex-col items-center relative">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#6941C6] text-white text-2xl font-bold mb-4">{step.number}</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-center">{step.description}</p>
            {step.number !== 3 && (
              <ArrowRight className="absolute right-[-36px] top-1/2 transform -translate-y-1/2 hidden md:block text-[#6941C6]" size={32} />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
