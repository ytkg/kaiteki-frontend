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
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 my-4 h-96">
        <HistoryChart data={data} targetDataKeys={['d1', 'd5']} />
      </div>
      <div className="flex-grow my-4 overflow-y-auto">
        <HistoryTable data={data} />
      </div>
    </div>
  );
};

export default HistoryDataContainer;
