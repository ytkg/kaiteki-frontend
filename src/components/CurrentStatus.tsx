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

interface CurrentStatusProps {
  latestData: DataItem | null;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({ latestData }) => {
  if (!latestData) {
    return null; // Or a loading/error state if you prefer
  }

  return (
    <div className="mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">現在の状況</h3>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-2 border rounded-lg bg-white">
              <p className="text-sm text-gray-600">室温</p>
              <p className="text-2xl font-bold">{latestData.d1}°C</p>
            </div>
            <div className="p-2 border rounded-lg bg-white">
              <p className="text-sm text-gray-600">ミスナール体感温度</p>
              <p className="text-2xl font-bold">{latestData.d5}°C</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">設定</h3>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-2 border rounded-lg bg-white">
              <p className="text-sm text-gray-600">目標のミスナール体感温度</p>
              <p className="text-2xl font-bold">23.8°C</p>
            </div>
            <div className="p-2 border rounded-lg bg-white">
              <p className="text-sm text-gray-600">エアコンの設定温度</p>
              <p className="text-2xl font-bold">{latestData.d4}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStatus;
