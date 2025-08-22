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

interface HistoryListProps {
  data: DataItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  return (
    <div className="overflow-y-auto max-h-96">
      {data.map((item, index) => (
        <div key={index} className={`p-3 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">{new Date(item.created).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
            <div className="flex justify-between">
              <span>室温</span>
              <span className="font-medium">{item.d1}°C</span>
            </div>
            <div className="flex justify-between">
              <span>湿度</span>
              <span className="font-medium">{item.d2}%</span>
            </div>
            <div className="flex justify-between">
              <span>体感温度</span>
              <span className="font-medium">{item.d5}°C</span>
            </div>
            <div className="flex justify-between">
              <span>設定温度</span>
              <span className="font-medium">{item.d4}°C</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
