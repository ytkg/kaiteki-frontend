import React from 'react';
import HistoryChart from './HistoryChart';
import DataTable, { type Column } from './DataTable';
import { useHistoryData } from '../hooks/useHistoryData';

interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

const columns: Column<DataItem>[] = [
  {
    key: 'created',
    header: '作成日時',
    isSticky: true,
    render: (item) => new Date(item.created).toLocaleString(),
  },
  { key: 'd1', header: '室温', textAlign: 'right' },
  { key: 'd2', header: '湿度', textAlign: 'right' },
  { key: 'd5', header: 'ミスナール体感温度', textAlign: 'right' },
  { key: 'd4', header: '設定温度', textAlign: 'right' },
];

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
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default HistoryDataContainer;
