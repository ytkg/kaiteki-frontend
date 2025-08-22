import React from 'react';
import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';
import { useHistoryData } from '../hooks/useHistoryData';

const HistoryDataContainer: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(300);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

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
};

export default HistoryDataContainer;
