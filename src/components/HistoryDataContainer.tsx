import React from 'react';
import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';
import { useHistoryData } from '../hooks/useHistoryData';

const HistoryDataContainer: React.FC = () => {
  const { data, error, isLoading } = useHistoryData(300);

  if (isLoading) {
    return <div className="text-center">読み込み中...</div>;
  }

  if (error || !data) {
    return <div className="text-center text-red-500">エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">温度推移</h3>
        <div className="border rounded-lg bg-white p-4">
          <HistoryChart data={data} targetDataKeys={['d1', 'd5']} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">履歴データ</h3>
        <div className="border rounded-lg bg-white">
          <HistoryTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default HistoryDataContainer;
