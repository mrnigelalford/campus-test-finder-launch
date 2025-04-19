
import SearchBox from "./SearchBox";

interface HeroProps {
  collegeName: string;
  collegeImage?: string;
  onSearch: (test: string, location: string) => void;
}

const Hero = ({ collegeName, collegeImage, onSearch }: HeroProps) => {
  return (
    <div className="bg-gradient-to-r from-[#F9F5FF] to-[#EBE4FF] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find Medical Tests Near {collegeName}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Easy access to medical testing for students and faculty. 
              Find, book, and get results from trusted labs near campus.
            </p>
            
            <div className="hidden lg:block">
              <div className="flex items-center gap-6 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#6941C6]">100+</span>
                  <span className="text-gray-600 text-sm">Testing Locations</span>
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#6941C6]">50+</span>
                  <span className="text-gray-600 text-sm">Test Types</span>
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#6941C6]">24/7</span>
                  <span className="text-gray-600 text-sm">Online Booking</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <SearchBox onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
