import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">アプリ名</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">ダッシュボード</Link>
          </li>
          <li>
            <Link to="/remote" className="hover:text-gray-300">リモコン</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
