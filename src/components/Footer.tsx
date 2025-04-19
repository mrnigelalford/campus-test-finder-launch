
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  collegeName: string;
}

const Footer = ({ collegeName }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About LabFinder</h3>
            <p className="text-gray-300 mb-4">
              LabFinder connects students and faculty from {collegeName} with local medical testing facilities for convenient healthcare diagnostics.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={16} />
              <a href="mailto:support@labfinder.com" className="hover:text-white transition-colors">
                support@labfinder.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              <Phone size={16} />
              <a href="tel:1-800-123-4567" className="hover:text-white transition-colors">
                1-800-123-4567
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Find a Lab
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Tests & Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Student Health Resources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Insurance Information
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{collegeName} Health Services</h3>
            <div className="flex items-start gap-2 text-gray-300 mb-4">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>
                University Health Center<br />
                123 College Ave<br />
                Campus, State 12345
              </span>
            </div>
            <p className="text-gray-300">
              For on-campus testing options and health services at {collegeName}, 
              visit the University Health Center or call (123) 456-7890.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LabFinder. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
