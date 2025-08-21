import React from 'react';
import HistoryTable from '../components/HistoryTable';

const DataPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">データ</h1>
      <div className="my-4">
        <HistoryTable />
      </div>
    </>
  );
};

export default DataPage;
