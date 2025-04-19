
import { Heart, Droplets, Brain, Activity, FlaskConical, Stethoscope } from "lucide-react";

interface TestTypeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const TestType = ({ icon, title, description, onClick }: TestTypeProps) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
    >
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
      icon: <Droplets size={24} />,
      title: "Blood Work",
      description: "Complete blood count, metabolic panels, and other blood tests",
      onClick: () => onSelectTest("Blood Work")
    },
    {
      icon: <Heart size={24} />,
      title: "Heart Health",
      description: "EKGs, echocardiograms, and cardiac stress tests",
      onClick: () => onSelectTest("Heart Health")
    },
    {
      icon: <Brain size={24} />,
      title: "Neurological",
      description: "Brain scans, nerve conduction studies, and more",
      onClick: () => onSelectTest("Neurological")
    },
    {
      icon: <Activity size={24} />,
      title: "General Health",
      description: "Physical exams, wellness checks, and preventive screenings",
      onClick: () => onSelectTest("General Health")
    },
    {
      icon: <FlaskConical size={24} />,
      title: "Lab Tests",
      description: "Urinalysis, STI testing, and other lab diagnostics",
      onClick: () => onSelectTest("Lab Tests")
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Respiratory",
      description: "Pulmonary function tests, chest X-rays, and more",
      onClick: () => onSelectTest("Respiratory")
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Tests for Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testTypes.map((test, index) => (
          <TestType
            key={index}
            icon={test.icon}
            title={test.title}
            description={test.description}
            onClick={test.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TestTypes;
