import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTv } from 'react-icons/fa';

const Footer: React.FC = () => {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'flex flex-col items-center';
    return isActive
      ? `${baseClasses} text-yellow-400`
      : `${baseClasses} text-white hover:text-gray-300`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <nav className="flex justify-around">
        <NavLink to="/" className={getLinkClassName}>
          <FaHome className="text-2xl" />
          <span className="text-xs">ホーム</span>
        </NavLink>
        <NavLink to="/remote" className={getLinkClassName}>
          <FaTv className="text-2xl" />
          <span className="text-xs">リモコン</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
