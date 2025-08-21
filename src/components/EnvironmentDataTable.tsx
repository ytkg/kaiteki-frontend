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

const EnvironmentDataTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=300');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const result: DataItem[] = await response.json();
        setData(result);
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

  const latestData = data[0];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">環境データ</h2>

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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-4 py-2 border-b text-left whitespace-nowrap">作成日時</th>
            <th className="px-4 py-2 border-b text-right whitespace-nowrap">室温</th>
            <th className="px-4 py-2 border-b text-right whitespace-nowrap">湿度</th>
            <th className="px-4 py-2 border-b text-right whitespace-nowrap">ミスナール体感温度</th>
            <th className="px-4 py-2 border-b text-right whitespace-nowrap">設定温度</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b whitespace-nowrap">{new Date(item.created).toLocaleString()}</td>
              <td className="px-4 py-2 border-b text-right whitespace-nowrap">{item.d1}</td>
              <td className="px-4 py-2 border-b text-right whitespace-nowrap">{item.d2}</td>
              <td className="px-4 py-2 border-b text-right whitespace-nowrap">{item.d5}</td>
              <td className="px-4 py-2 border-b text-right whitespace-nowrap">{item.d4}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default EnvironmentDataTable;
