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

const HistoryTable: React.FC = () => {
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

  return (
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
  );
};

export default HistoryTable;
