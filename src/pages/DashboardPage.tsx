import React from 'react';
import EnvironmentDataTable from '../components/EnvironmentDataTable';

const DashboardPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <div className="my-4">
        <EnvironmentDataTable />
      </div>
    </>
  );
};

export default DashboardPage;
