import React from 'react';
import DataTable, { type Column } from './DataTable';

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

const columns: Column<DataItem>[] = [
  {
    key: 'created',
    header: '作成日時',
    isSticky: true,
    render: (item) => new Date(item.created).toLocaleString(),
  },
  { key: 'd1', header: '室温', textAlign: 'right' },
  { key: 'd2', header: '湿度', textAlign: 'right' },
  { key: 'd5', header: 'ミスナール体感温度', textAlign: 'right' },
  { key: 'd4', header: '設定温度', textAlign: 'right' },
];

const OddDataTable: React.FC<OddDataTableProps> = ({ data }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-3">サマリー</h3>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OddDataTable;
