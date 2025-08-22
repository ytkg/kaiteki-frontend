import React from 'react';
import useSWR from 'swr';
import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';
import { formatTimestamp } from '../utils/date';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

// Define the fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json());

const HistoryDataContainer: React.FC = () => {
  const { data, error, isLoading } = useSWR<DataItem[]>('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=300', fetcher);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  const transformedData = data.map(item => ({
    ...item,
    created: formatTimestamp(item.created),
  }));

  const allValues = transformedData.flatMap(item => [item.d1, item.d5]);
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);

  return (
    <>
      <div className="my-4">
        <HistoryChart data={transformedData} yAxisMin={dataMin - 2} yAxisMax={dataMax + 2} />
      </div>
      <div className="my-4">
        <HistoryTable data={transformedData} />
      </div>
    </>
  );
};

export default HistoryDataContainer;
