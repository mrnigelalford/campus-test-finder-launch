
import { MapPin, Star, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface TestingFacilityProps {
  id: string;
  name: string;
  location: string;
  address: string;
  distance: string;
  rating?: number;
  acceptsInsurance?: boolean;
  quickestTurnaround?: string;
  onSelect: () => void;
}

const TestingFacility = ({
  id,
  name,
  location,
  address,
  distance,
  rating,
  acceptsInsurance = true,
  quickestTurnaround = "24 hours",
  onSelect
}: TestingFacilityProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-[#6941C6] rounded-full flex items-center justify-center text-white font-bold">
            {name.substring(0, 2)}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{name} | {location}</h3>
          
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <MapPin size={16} />
            <span className="text-sm">{distance} mi</span>
            <span className="mx-1">•</span>
            <span className="text-sm">{address}</span>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-3">
            {rating && (
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
            
            {acceptsInsurance && (
              <div className="flex items-center gap-1">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm">Accepts Insurance</span>
              </div>
            )}
            
            {quickestTurnaround && (
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm">Results in {quickestTurnaround}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={onSelect}
          className="bg-[#6941C6] hover:bg-[#5731b3]"
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default TestingFacility;
