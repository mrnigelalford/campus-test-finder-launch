
import { Search, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface SearchBoxProps {
  onSearch: (test: string, location: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [test, setTest] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(test, location);
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Convert coordinates to address using reverse geocoding
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1IjoibGZtYXBib3giLCJhIjoiY2wwcTRoZjQzMjY0bTNqcDdqbjlqNmFociJ9.Q8jPUrCDqxkQ2ZYNp70LxQ`)
          .then(response => response.json())
          .then(data => {
            if (data.features && data.features[0]) {
              setLocation(data.features[0].place_name);
            }
          })
          .catch(() => {
            toast({
              title: "Location Error",
              description: "Could not determine your address",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLocating(false);
          });
      },
      (error) => {
        toast({
          title: "Location Error",
          description: error.message,
          variant: "destructive",
        });
        setIsLocating(false);
      }
    );
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
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your location or ZIP code"
              className="pl-10 py-6"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button 
              type="button"
              variant="outline"
              className="py-6"
              onClick={getCurrentLocation}
              disabled={isLocating}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#6941C6] hover:bg-[#5731b3] py-6 text-lg"
        >
          Find Available Tests
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
