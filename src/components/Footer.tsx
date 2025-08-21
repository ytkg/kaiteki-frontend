import React from 'react';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <nav className="flex justify-around">
        <a href="#" className="flex flex-col items-center hover:text-gray-300">
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center hover:text-gray-300">
          <FaCog className="text-2xl" />
          <span className="text-xs">Settings</span>
        </a>
        <a href="#" className="flex flex-col items-center hover:text-gray-300">
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
