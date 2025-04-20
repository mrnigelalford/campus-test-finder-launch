
import { Heart, FlaskConical, Brain, Activity, ShieldCheck, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestTypeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPopular?: boolean;
  onClick: () => void;
}

const TestType = ({ icon, title, description, isPopular, onClick }: TestTypeProps) => {
  return (
    <div 
      className={cn(
        "bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative",
        isPopular && "border-[#6941C6]"
      )}
      onClick={onClick}
    >
      {isPopular && (
        <div className="absolute -top-3 left-4 bg-[#6941C6] text-white text-xs px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      <div className="w-12 h-12 bg-[#F9F5FF] rounded-lg flex items-center justify-center text-[#6941C6] mb-4">
        {icon}
      </div>
      <h3 className="font-medium text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

interface TestTypesProps {
  onSelectTest: (testName: string) => void;
}

const TestTypes = ({ onSelectTest }: TestTypesProps) => {
  const testTypes = [
    {
      icon: <FlaskConical size={24} />,
      title: "Blood Work",
      description: "Complete blood count, metabolic panels, and other blood tests",
      onClick: () => onSelectTest("Blood Work"),
      isPopular: true
    },
    {
      icon: <Activity size={24} />,
      title: "General Health",
      description: "Physical exams, wellness checks, and preventive screenings",
      onClick: () => onSelectTest("General Health"),
      isPopular: true
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "TB Test",
      description: "Tuberculosis testing required for campus activities",
      onClick: () => onSelectTest("TB Test")
    },
    {
      icon: <Brain size={24} />,
      title: "STD Testing",
      description: "Confidential testing for sexually transmitted diseases",
      onClick: () => onSelectTest("STD Testing")
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Tests for Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {testTypes.map((test, index) => (
          <TestType
            key={index}
            icon={test.icon}
            title={test.title}
            description={test.description}
            isPopular={test.isPopular}
            onClick={test.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TestTypes;
