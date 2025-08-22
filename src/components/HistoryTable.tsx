import React from 'react';
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

interface HistoryTableProps {
  data: DataItem[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
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
              <td className="px-4 py-2 border-b whitespace-nowrap">{formatTimestamp(item.created)}</td>
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
