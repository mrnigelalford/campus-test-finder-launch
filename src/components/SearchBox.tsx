import { Search, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface SearchBoxProps {
  onSearch: (test: string, location: string) => void;
}

// Sample data to use when OpenSearch API fails due to CORS
const sampleSearchData = [
  "TB Test (Quantiferon-TB Gold)",
  "Complete Blood Count (CBC)",
  "COVID-19 PCR Test",
  "Lipid Panel",
  "Comprehensive Metabolic Panel",
  "Hemoglobin A1C",
  "Urinalysis",
  "STD Panel",
  "Thyroid Panel",
  "Vitamin D Test"
];

// BOOKING PORTAL URL BUILDER
function buildBookingUrl(examId: number, zipcode: string) {
  // Always today's date in yyyy-mm-dd
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  // Insurance 832 is fallback
  return `https://portal.labfinder.com/booking-widget/search-results?date=${todayStr}&page=1&exam=${examId}&insurance=832&location=${zipcode}`;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [test, setTest] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

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

  // Fetch suggestions from OpenSearch or fall back to sample data
  const handleTestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value);
    if (e.target.value.length < 2) {
      setSuggestions([]);
      return;
    }

    // Try to fetch from OpenSearch
    fetch("https://at9b61vgf2wp1awumucd.us-east-1.aoss.amazonaws.com/exams/_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: {
          multi_match: {
            query: e.target.value,
            fields: ["label", "post_title", "examslug"],
            fuzziness: "auto"
          }
        },
        size: 5
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("OpenSearch request failed");
        }
        return res.json();
      })
      .then(data => {
        const hits = data?.hits?.hits || [];
        setSuggestions(hits.map((hit: any) => hit._source?.label || hit._source?.post_title || ""));
      })
      .catch(() => {
        // Fall back to sample data filtered by the search input
        const filteredSuggestions = sampleSearchData.filter(
          item => item.toLowerCase().includes(e.target.value.toLowerCase())
        ).slice(0, 5);
        
        setSuggestions(filteredSuggestions);
        
        console.log("Using fallback search data due to CORS or API error");
      });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTest(suggestion);
    setSuggestions([]);
  };

  // Slightly improve ZIP extraction when building the URL. Use a simple regex.
  const getZipFromLocation = () => {
    const zipMatch = location.match(/\b\d{5}\b/);
    return zipMatch ? zipMatch[0] : location;
  };

  const examId = 61718; // fallback, as requested

  const bookingUrl = buildBookingUrl(examId, getZipFromLocation());

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
            onChange={handleTestInput}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 100)} // slight delay for suggestion click
            autoComplete="off"
          />
          {searchFocused && suggestions.length > 0 && (
            <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-48 overflow-auto">
              {suggestions.map((s, idx) => (
                <li 
                  key={s + idx} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
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
      {/* Demo: Show the constructed booking URL for dev/demo purposes only */}
      {location && (
        <div className="mt-6">
          <span className="block font-medium mb-2 text-gray-700">Sample Booking URL (for dev):</span>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6941C6] underline break-all"
          >
            {bookingUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
