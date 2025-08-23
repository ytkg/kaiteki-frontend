import React from 'react';
import { formatDate } from '../utils/date';

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
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 font-semibold text-gray-600 text-center whitespace-nowrap">日時</th>
            <th className="p-2 font-semibold text-gray-600 text-center whitespace-nowrap">室温</th>
            <th className="p-2 font-semibold text-gray-600 text-center whitespace-nowrap">湿度</th>
            <th className="p-2 font-semibold text-gray-600 text-center whitespace-nowrap">体感温度</th>
            <th className="p-2 font-semibold text-gray-600 text-center whitespace-nowrap">設定温度</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-2 text-gray-800 text-center whitespace-nowrap">{formatDate(item.created)}</td>
              <td className="p-2 text-gray-800 text-right whitespace-nowrap">{item.d1}°C</td>
              <td className="p-2 text-gray-800 text-right whitespace-nowrap">{item.d2}%</td>
              <td className="p-2 text-gray-800 text-right whitespace-nowrap">{item.d5}°C</td>
              <td className="p-2 text-gray-800 text-right whitespace-nowrap">{item.d4}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
