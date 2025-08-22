import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatTimestamp } from '../utils/date';

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
    created: formatTimestamp(item.created),
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
        <XAxis dataKey="created" />
        <YAxis domain={[yAxisMin, yAxisMax]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="d1" stroke="#8884d8" name="室温" />
        <Line type="monotone" dataKey="d5" stroke="#82ca9d" name="ミスナール体感温度" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
