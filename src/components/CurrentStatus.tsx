import React from 'react';
import useSWR from 'swr';

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

const CurrentStatus: React.FC = () => {
  const { data, error, isLoading } = useSWR<DataItem[]>('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=1', fetcher);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  const latestData = data[0];

  return (
    <>
      {latestData && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">最新の状況</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">室温</p>
              <p className="text-2xl font-bold">{latestData.d1}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ミスナール体感温度</p>
              <p className="text-2xl font-bold">{latestData.d5}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">設定温度</p>
              <p className="text-2xl font-bold">{latestData.d4}°C</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentStatus;
