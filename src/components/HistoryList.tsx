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
  // Explicitly set text-left on header
  const headerClass = "py-2 px-1 font-semibold text-sm text-gray-600 text-left";
  const cellClass = "py-2 px-1 text-sm text-gray-800";

  // Custom grid columns:
  // 1st column (date) is flexible, others are sized to their content.
  const gridLayout = "grid gap-x-2 grid-cols-[1fr_repeat(4,min-content)]";

  return (
    <div>
      {/* Header */}
      <div className={`${gridLayout} bg-gray-50 rounded-t-lg`}>
        {/* Explicitly set text-left on all headers */}
        <div className={`${headerClass} whitespace-nowrap`}>日時</div>
        <div className={headerClass}>室温</div>
        <div className={headerClass}>湿度</div>
        <div className={headerClass}>体感温度</div>
        <div className={headerClass}>設定温度</div>
      </div>

      {/* Body */}
      <div className="bg-white rounded-b-lg">
        {data.map((item, index) => (
          <div key={index} className={`${gridLayout} border-t border-gray-200 items-center`}>
            <div className={`${cellClass} whitespace-nowrap`}>{formatDate(item.created)}</div>
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
