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
  yAxisMin: number;
  yAxisMax: number;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data, yAxisMin, yAxisMax }) => {
  const chartData = data.map(item => ({
    ...item,
    created: new Date(item.created).toLocaleTimeString(),
  })).reverse(); // Reverse the data to show oldest first

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
        <YAxis domain={[yAxisMin, yAxisMax]} tickCount={8} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="d1" stroke="#8884d8" name="室温" dot={false} />
        <Line type="monotone" dataKey="d5" stroke="#82ca9d" name="ミスナール体感温度" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
