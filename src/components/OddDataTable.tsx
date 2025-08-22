import React from 'react';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

interface OddDataTableProps {
  data: DataItem[];
}

const OddDataTable: React.FC<OddDataTableProps> = ({ data }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3">サマリー</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="sticky left-0 bg-gray-100 px-4 py-2 border-b text-left whitespace-nowrap">作成日時</th>
              <th className="px-4 py-2 border-b text-right whitespace-nowrap">室温</th>
              <th className="px-4 py-2 border-b text-right whitespace-nowrap">湿度</th>
              <th className="px-4 py-2 border-b text-right whitespace-nowrap">ミスナール体感温度</th>
              <th className="px-4 py-2 border-b text-right whitespace-nowrap">設定温度</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="sticky left-0 bg-white px-4 py-2 border-b whitespace-nowrap">{new Date(item.created).toLocaleString()}</td>
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

export default OddDataTable;
