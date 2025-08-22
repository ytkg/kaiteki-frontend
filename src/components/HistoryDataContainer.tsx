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

  return (
    <>
      <div className="my-4">
        <HistoryChart data={data} targetDataKeys={['d1', 'd5']} />
      </div>
      <div className="my-4">
        <HistoryTable data={data} />
      </div>
    </>
  );
};

export default HistoryDataContainer;
