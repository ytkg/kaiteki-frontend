import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <div className="my-4">
        <p>ようこそ！</p>
        <p>
          環境データは<Link to="/data" className="text-blue-500 hover:underline">データページ</Link>で確認できます。
        </p>
      </div>
    </>
  );
};

export default DashboardPage;
