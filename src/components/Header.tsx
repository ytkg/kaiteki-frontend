import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-10 h-16 flex items-center justify-center bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Aircon Management Console</h1>
    </header>
  );
};

export default Header;
