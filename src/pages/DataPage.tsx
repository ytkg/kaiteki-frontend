import React from 'react';
import EnvironmentDataTable from '../components/EnvironmentDataTable';

const DataPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">データ</h1>
      <div className="my-4">
        <EnvironmentDataTable />
      </div>
    </>
  );
};

export default DataPage;
