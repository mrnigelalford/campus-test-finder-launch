
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchBoxProps {
  onSearch: (test: string, location: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [test, setTest] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(test, location);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book an appointment</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by test name (e.g. COVID-19, Blood test)"
            className="pl-10 py-6"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Enter your location or ZIP code"
            className="pl-10 py-6"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#6941C6] hover:bg-[#5731b3] py-6 text-lg"
        >
          View availability
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
