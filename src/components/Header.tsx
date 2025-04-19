
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import for mobile menu toggle
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
        {/* Desktop and Mobile Header Layout */}
        <div className="flex justify-between items-center">
          {/* Logo and College Name Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/placeholder.svg" 
                alt="LabFinder Logo" 
                className="h-8 w-8" 
              />
              <span className="text-[#6941C6] font-bold text-xl hidden md:inline">LabFinder<sup className="text-xs">®</sup></span>
            </Link>
            <span className="text-gray-400 px-3 hidden md:inline">|</span>
            {collegeLogo ? (
              <img 
                src={collegeLogo} 
                alt={`${collegeName} Logo`} 
                className="h-10 hidden md:block" 
              />
            ) : null}
            <span className="font-medium text-gray-700 text-lg hidden md:inline">{collegeName}</span>
          
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-[#6941C6]" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`
            fixed inset-0 bg-white z-50 flex flex-col 
            md:relative md:flex md:flex-row md:items-center md:gap-4 
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
          `}>
            {/* Close button for mobile */}
            <button 
              className="md:hidden self-end p-4" 
              onClick={toggleMobileMenu}
            >
              <X size={24} className="text-[#6941C6]" />
            </button>

            {/* Mobile College Name and Logo */}
            <div className="md:hidden flex flex-col items-center mb-6 px-4">
              {collegeLogo && (
                <img 
                  src={collegeLogo} 
                  alt={`${collegeName} Logo`} 
                  className="h-16 mb-2" 
                />
              )}
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
                className="text-[#6941C6] hover:text-[#5731b3] font-medium w-full md:w-auto text-center py-2 md:py-0"
                onClick={toggleMobileMenu}
              >
                Help
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

