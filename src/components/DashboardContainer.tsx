import React from 'react';
import CurrentStatus from './CurrentStatus';
import OddDataTable from './OddDataTable';
import { useHistoryData } from '../hooks/useHistoryData';

const DashboardContainer: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(9);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data || data.length === 0) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  const latestData = data[0];
  const oddData = data.filter((_, index) => index % 2 === 0 && index < 9); // 0, 2, 4, 6, 8

  return (
    <>
      <CurrentStatus latestData={latestData} />
      <OddDataTable data={oddData} />
    </>
  );
};

export default DashboardContainer;
