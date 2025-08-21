import React from 'react';
import DashboardContainer from '../components/DashboardContainer';

const DashboardPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <DashboardContainer />
    </>
  );
};

export default DashboardPage;
