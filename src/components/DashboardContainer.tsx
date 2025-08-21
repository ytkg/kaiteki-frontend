import React from 'react';
import useSWR from 'swr';
import CurrentStatus from './CurrentStatus';
import OddDataTable from './OddDataTable';

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

const DashboardContainer: React.FC = () => {
  const { data, error, isLoading } = useSWR<DataItem[]>('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=9', fetcher);

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
