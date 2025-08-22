import React from 'react';
import HistoryChart from '../components/HistoryChart';
import HistoryTable from '../components/HistoryTable';
import { useHistoryData } from '../hooks/useHistoryData';
import DataWrapper from '../components/DataWrapper';

const DataPage: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(300);

  return (
    <DataWrapper isLoading={isLoading} error={error} data={data}>
      {data && (() => {
        const allValues = data.flatMap(item => [item.d1, item.d5]);
        const dataMin = Math.min(...allValues);
        const dataMax = Math.max(...allValues);

        return (
          <>
            <div className="my-4">
              <HistoryChart data={data} yAxisMin={dataMin - 2} yAxisMax={dataMax + 2} />
            </div>
            <div className="my-4">
              <HistoryTable data={data} />
            </div>
          </>
        );
      })()}
    </DataWrapper>
  );
};

export default DataPage;
