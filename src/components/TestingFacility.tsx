
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-[#6941C6] rounded-full flex items-center justify-center text-white font-bold">
              {name.substring(0, 2)}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-grow space-y-3">
          {/* Facility Name and Location */}
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600">{location}</p>
          </div>
          
          {/* Address and Distance */}
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={16} />
            <span className="text-sm">{distance} mi</span>
            <span className="mx-1">•</span>
            <span className="text-sm">{address}</span>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-4">
            {rating && (
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
            
            {acceptsInsurance && (
              <div className="flex items-center gap-1.5">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm">Accepts Insurance</span>
              </div>
            )}
            
            {quickestTurnaround && (
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm">Results in {quickestTurnaround}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Button Section */}
        <div className="flex-shrink-0 self-center">
          <Button 
            onClick={onSelect}
            className="bg-[#6941C6] hover:bg-[#5731b3] min-w-[100px]"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestingFacility;
