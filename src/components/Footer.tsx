import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCog, FaTv } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <nav className="flex justify-around">
        <Link to="/" className="flex flex-col items-center hover:text-gray-300">
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center hover:text-gray-300">
          <FaCog className="text-2xl" />
          <span className="text-xs">Settings</span>
        </Link>
        <Link to="/remote" className="flex flex-col items-center hover:text-gray-300">
          <FaTv className="text-2xl" />
          <span className="text-xs">リモコン</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
