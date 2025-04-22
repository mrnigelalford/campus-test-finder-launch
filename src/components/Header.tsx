
import React from "react";

interface HeaderProps {
  collegeName: string;
  collegeLogo: string;
}

const Header = ({ collegeName, collegeLogo }: HeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={collegeLogo} alt={collegeName + " logo"} className="h-10" />
          <span className="font-bold text-xl text-[#6941C6]">{collegeName}</span>
        </div>
        <nav>
          <ul className="flex gap-8 items-center text-gray-700 font-medium">
            <li>
              <a href="#how-it-works" className="hover:text-[#6941C6] transition-colors">How It Works</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#6941C6] transition-colors">FAQ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
