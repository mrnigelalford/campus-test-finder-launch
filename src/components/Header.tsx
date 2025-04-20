
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  collegeName: string;
  collegeLogo?: string;
}

const Header = ({ collegeName, collegeLogo }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://content.labfinder.com/wp-content/themes/Avada/images/mm-home/labfinder-logo.svg" 
                alt="LabFinder Logo" 
                className="h-8" 
              />
            </Link>
            <span className="text-gray-400 px-3 hidden md:inline">|</span>
            <span className="text-gray-600 hidden md:inline">Preferred Solution of</span>
            <img 
              src="https://www.kennesaw.edu/stratcomm/branding/images/university-logo-2.png" 
              alt="Kennesaw State University Logo" 
              className="h-10 hidden md:block" 
            />
          
            <button 
              className="md:hidden text-[#6941C6]" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`
            fixed inset-0 bg-white z-50 flex flex-col 
            md:relative md:flex md:flex-row md:items-center md:gap-4 
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
          `}>
            <button 
              className="md:hidden self-end p-4" 
              onClick={toggleMobileMenu}
            >
              <X size={24} className="text-[#6941C6]" />
            </button>

            <div className="md:hidden flex flex-col items-center mb-6 px-4">
              <img 
                src="https://www.kennesaw.edu/stratcomm/branding/images/university-logo-2.png" 
                alt="Kennesaw State University Logo" 
                className="h-16 mb-2" 
              />
              <span className="font-bold text-xl text-gray-800">{collegeName}</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:px-0">
              <Link 
                to="#" 
                className="text-[#6941C6] hover:text-[#5731b3] font-medium w-full md:w-auto text-center py-2 md:py-0"
                onClick={toggleMobileMenu}
              >
                How it works
              </Link>
              <Link 
                to="#" 
                className="bg-[#6941C6] hover:bg-[#5731b3] text-white px-4 py-2 rounded-md font-medium transition-colors w-full md:w-auto text-center"
                onClick={toggleMobileMenu}
              >
                My account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
