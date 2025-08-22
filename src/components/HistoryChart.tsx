import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

interface HistoryChartProps {
  data: DataItem[];
  targetDataKeys: ('d1' | 'd2' | 'd3' | 'd4' | 'd5')[];
}

const lineDefs = {
  d1: { name: '室温', stroke: '#8884d8' },
  d5: { name: 'ミスナール体感温度', stroke: '#82ca9d' },
  d4: { name: 'エアコンの設定温度', stroke: '#ffc658' },
};

const HistoryChart: React.FC<HistoryChartProps> = ({ data, targetDataKeys }) => {
  const chartData = data.map(item => ({
    ...item,
    created: new Date(item.created).toLocaleTimeString(),
  })).reverse(); // Reverse the data to show oldest first

  // Dynamically calculate Y-axis domain
  const values = chartData.flatMap(item =>
    targetDataKeys.map(key => item[key])
  );
  const yAxisMin = Math.min(...values) - 1;
  const yAxisMax = Math.max(...values) + 1;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created" interval="preserveStartEnd" />
        <YAxis domain={[Math.floor(yAxisMin), Math.ceil(yAxisMax)]} tickCount={8} />
        <Tooltip />
        <Legend />
        {targetDataKeys.map(key => {
          const def = lineDefs[key as keyof typeof lineDefs];
          if (!def) return null;
          return <Line key={key} type="monotone" dataKey={key} stroke={def.stroke} name={def.name} dot={false} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
