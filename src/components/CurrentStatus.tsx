import React, { useEffect, useState } from 'react';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

const CurrentStatus: React.FC = () => {
  const [latestData, setLatestData] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=1');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const result: DataItem[] = await response.json();
        if (result.length > 0) {
          setLatestData(result[0]);
        }
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('不明なエラーが発生しました');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

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
