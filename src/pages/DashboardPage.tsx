import React from 'react';
import CurrentStatus from '../components/CurrentStatus';

const DashboardPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <div className="my-4">
        <CurrentStatus />
      </div>
    </>
  );
};

export default DashboardPage;
