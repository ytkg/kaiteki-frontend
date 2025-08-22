import React from 'react';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  cmnt: string;
  created: string;
}

interface OddDataTableProps {
  data: DataItem[];
}

const OddDataTable: React.FC<OddDataTableProps> = ({ data }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3">実行履歴</h3>
      <div className="border rounded-lg bg-gray-50">
        {data.map((item, index) => (
          <div key={index} className={`p-3 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <p className="text-sm text-gray-800">{item.cmnt}</p>
            <p className="text-xs text-gray-500 mt-1 text-right">{new Date(item.created).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OddDataTable;
