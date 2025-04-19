
import { Link } from "react-router-dom";

interface HeaderProps {
  collegeName: string;
  collegeLogo?: string;
}

const Header = ({ collegeName, collegeLogo }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/16389478-8997-48da-8632-08a211a1b50c.png" 
              alt="LabFinder Logo" 
              className="h-8" 
            />
            <span className="text-[#6941C6] font-bold text-xl">LabFinder<sup className="text-xs">®</sup></span>
          </Link>
          <span className="text-gray-400 px-3">|</span>
          {collegeLogo ? (
            <img 
              src={collegeLogo} 
              alt={`${collegeName} Logo`} 
              className="h-10" 
            />
          ) : null}
          <span className="font-medium text-gray-700 text-lg">{collegeName}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="#" className="text-[#6941C6] hover:text-[#5731b3] font-medium">
            How it works
          </Link>
          <Link to="#" className="text-[#6941C6] hover:text-[#5731b3] font-medium">
            Help
          </Link>
          <Link to="#" className="bg-[#6941C6] hover:bg-[#5731b3] text-white px-4 py-2 rounded-md font-medium transition-colors">
            My account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
