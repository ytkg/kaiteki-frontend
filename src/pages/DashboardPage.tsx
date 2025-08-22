import React from 'react';
import CurrentStatus from '../components/CurrentStatus';
import OddDataTable from '../components/OddDataTable';
import { useHistoryData } from '../hooks/useHistoryData';
import DataWrapper from '../components/DataWrapper';

const DashboardPage: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(9);

  return (
    <DataWrapper isLoading={isLoading} error={error} data={data}>
      {data && (
        <>
          <CurrentStatus latestData={data[0]} />
          <OddDataTable data={data.filter((_, index) => index % 2 === 0 && index < 9)} />
        </>
      )}
    </DataWrapper>
  );
};

export default DashboardPage;
