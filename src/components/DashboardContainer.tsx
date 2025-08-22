import React from 'react';
import CurrentStatus from './CurrentStatus';
import OddDataTable from './OddDataTable';
import { useHistoryData } from '../hooks/useHistoryData';

const DashboardContainer: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(100);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data || data.length === 0) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  const latestData = data[0];
  const oddData = data.filter(item => item.cmnt && item.cmnt.length > 0).slice(0, 10);

  return (
    <>
      <CurrentStatus latestData={latestData} historyData={data} />
      <OddDataTable data={oddData} />
    </>
  );
};

export default DashboardContainer;
