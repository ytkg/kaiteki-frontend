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

interface HistoryListProps {
  data: DataItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  // Reduced padding, especially horizontal (px-1)
  const headerClass = "px-1 py-2 font-semibold text-sm text-gray-600 text-left";
  const cellClass = "px-1 py-2 text-sm text-gray-800";

  return (
    // Removed the overflow-x-auto and min-w containers
    <div>
      {/* Header */}
      <div className="grid grid-cols-5 bg-gray-50 rounded-t-lg">
        <div className={headerClass}>日時</div>
        <div className={`${headerClass} text-right`}>室温</div>
        <div className={`${headerClass} text-right`}>湿度</div>
        <div className={`${headerClass} text-right`}>体感温度</div>
        <div className={`${headerClass} text-right`}>設定温度</div>
      </div>

      {/* Body */}
      <div className="bg-white rounded-b-lg">
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-5 border-t border-gray-200">
            {/* Removed whitespace-nowrap */}
            <div className={cellClass}>{formatDate(item.created)}</div>
            <div className={`${cellClass} text-right`}>{item.d1}°C</div>
            <div className={`${cellClass} text-right`}>{item.d2}%</div>
            <div className={`${cellClass} text-right`}>{item.d5}°C</div>
            <div className={`${cellClass} text-right`}>{item.d4}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
