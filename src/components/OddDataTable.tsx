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
      <h3 className="text-lg font-semibold mb-3">サマリー</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-800">{item.cmnt}</p>
            <p className="text-sm text-gray-500 mt-2">{new Date(item.created).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OddDataTable;
