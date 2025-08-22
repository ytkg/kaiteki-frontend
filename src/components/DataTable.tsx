import React from 'react';

// Interface for column definition
export interface Column<T> {
  key: keyof T;
  header: string;
  isSticky?: boolean;
  textAlign?: 'left' | 'right';
  render?: (item: T) => React.ReactNode; // Optional custom render function
}

// Interface for component props
interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const DataTable = <T extends { created: string }>({ columns, data }: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`
                  px-4 py-2 border-b whitespace-nowrap
                  ${col.isSticky ? 'sticky left-0 bg-gray-100' : ''}
                  ${col.textAlign === 'right' ? 'text-right' : 'text-left'}
                `}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className={`
                    px-4 py-2 border-b whitespace-nowrap
                    ${col.isSticky ? 'sticky left-0 bg-white' : ''}
                    ${col.textAlign === 'right' ? 'text-right' : 'text-left'}
                  `}
                >
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
