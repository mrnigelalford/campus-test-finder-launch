
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface HeaderProps {
  collegeName: string;
  collegeLogo: string;
}

const Header = ({ collegeName, collegeLogo }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-8 items-center text-gray-700 font-medium">
      <li>
        <a href="#how-it-works" className="hover:text-[#6941C6] transition-colors" onClick={() => isMobile && setIsMenuOpen(false)}>How It Works</a>
      </li>
      <li>
        <a href="#faq" className="hover:text-[#6941C6] transition-colors" onClick={() => isMobile && setIsMenuOpen(false)}>FAQ</a>
      </li>
    </ul>
  );

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="h-8">
            <img 
              src="https://content.labfinder.com/wp-content/themes/Avada/images/mm-home/labfinder-logo.svg" 
              alt="LabFinder logo" 
              className="h-8" 
            />
          </a>
          <img src={collegeLogo} alt={collegeName + " logo"} className="h-10" />
          {!isMobile && (
            <span className="font-bold text-xl text-[#6941C6]">{collegeName}</span>
          )}
        </div>

        {isMobile ? (
          <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DrawerTrigger asChild>
              <button 
                className="text-gray-700" 
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </DrawerTrigger>
            <DrawerContent className="p-6">
              <nav className="flex justify-center">
                <NavLinks />
              </nav>
            </DrawerContent>
          </Drawer>
        ) : (
          <nav>
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
