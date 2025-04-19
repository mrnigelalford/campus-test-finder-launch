
import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TestTypes from "../components/TestTypes";
import Map from "../components/Map";
import TestingFacility from "../components/TestingFacility";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const Index = () => {
  // You can replace these with actual data from an API
  const [collegeName] = useState("Stanford University");
  const [searchedTest, setSearchedTest] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  // Example data - in a real app, these would come from an API
  const facilities = [
    {
      id: "lab1",
      name: "LabCorp",
      location: "Palo Alto",
      address: "701 Welch Rd, Palo Alto, CA 94304",
      distance: "0.8",
      rating: 4.7,
      coordinates: [-122.173801, 37.441883] as [number, number],
      acceptsInsurance: true,
      quickestTurnaround: "24 hours"
    },
    {
      id: "lab2",
      name: "Quest Diagnostics",
      location: "Stanford",
      address: "900 Blake Wilbur Dr, Stanford, CA 94305",
      distance: "1.2",
      rating: 4.5,
      coordinates: [-122.175235, 37.437579] as [number, number],
      acceptsInsurance: true,
      quickestTurnaround: "48 hours"
    },
    {
      id: "lab3",
      name: "Stanford Health Care",
      location: "Stanford",
      address: "300 Pasteur Dr, Stanford, CA 94305",
      distance: "1.5",
      rating: 4.8,
      coordinates: [-122.175835, 37.433981] as [number, number],
      acceptsInsurance: true,
      quickestTurnaround: "24 hours"
    }
  ];

  const handleSearch = (test: string, location: string) => {
    setSearchedTest(test);
    setSearchedLocation(location);
    // In a real app, this would trigger an API call to get results
  };

  const handleSelectTest = (testName: string) => {
    setSearchedTest(testName);
    // In a real app, this would trigger an API call or update the search form
  };

  const faqs = [
    {
      question: "How do I find a testing location near campus?",
      answer: "Use the search box at the top of the page to enter your test type and location. You can also explore the map to see all available testing facilities near Stanford University."
    },
    {
      question: "Does my student health insurance cover these tests?",
      answer: "Most student health insurance plans cover diagnostic testing. You can verify coverage when booking your appointment. Many of our partner facilities accept Stanford's student health insurance."
    },
    {
      question: "How long does it take to get test results?",
      answer: "Result times vary by test type and facility. Routine blood work typically takes 24-48 hours, while some specialized tests may take longer. Each facility lists their expected turnaround times."
    },
    {
      question: "Do I need a doctor's referral for testing?",
      answer: "Some tests require a doctor's referral while others don't. When booking, the system will indicate if a referral is needed for your selected test."
    },
    {
      question: "Can I use the campus health center for testing?",
      answer: "Yes, the Stanford Health Center offers some testing services. However, LabFinder provides access to a wider range of tests and facilities both on and off campus."
    },
    {
      question: "How do I prepare for my test?",
      answer: "Preparation instructions vary by test. Once you book an appointment, you'll receive specific preparation instructions for your test, such as fasting requirements or medication considerations."
    }
  ];

  // Calculate map center from facilities
  const mapCenter: [number, number] = facilities.length > 0 
    ? [
        facilities.reduce((sum, f) => sum + f.coordinates[0], 0) / facilities.length,
        facilities.reduce((sum, f) => sum + f.coordinates[1], 0) / facilities.length
      ]
    : [-122.1752, 37.4374]; // Stanford's coordinates as default

  const mapMarkers = facilities.map(f => ({
    id: f.id,
    coordinates: f.coordinates,
    title: f.name,
    address: f.address,
    distance: f.distance
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header collegeName={collegeName} />
      
      <main>
        <Hero 
          collegeName={collegeName} 
          onSearch={handleSearch} 
        />
        
        <div className="container mx-auto px-4 py-12">
          <TestTypes onSelectTest={handleSelectTest} />
          
          <div className="my-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {searchedTest || searchedLocation 
                ? `${searchedTest ? searchedTest + " " : ""}${searchedLocation ? "near " + searchedLocation : ""}` 
                : "Testing Facilities Near Stanford University"}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                {facilities.map(facility => (
                  <TestingFacility
                    key={facility.id}
                    id={facility.id}
                    name={facility.name}
                    location={facility.location}
                    address={facility.address}
                    distance={facility.distance}
                    rating={facility.rating}
                    acceptsInsurance={facility.acceptsInsurance}
                    quickestTurnaround={facility.quickestTurnaround}
                    onSelect={() => setSelectedFacilityId(facility.id)}
                  />
                ))}
              </div>
              
              <div className="lg:col-span-2">
                <Map 
                  centerLocation={mapCenter} 
                  markers={mapMarkers}
                />
              </div>
            </div>
          </div>
          
          <div className="my-16">
            <FAQSection faqs={faqs} />
          </div>
        </div>
      </main>
      
      <Footer collegeName={collegeName} />
    </div>
  );
};

export default Index;
