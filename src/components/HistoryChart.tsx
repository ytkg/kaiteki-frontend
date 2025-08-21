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
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    created: new Date(item.created).toLocaleString(),
  })).reverse(); // Reverse the data to show oldest first

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        isAnimationActive={false}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="d1" stroke="#8884d8" name="室温" strokeWidth={2} dot={false} activeDot={{ r: 5 }}/>
        <Line type="monotone" dataKey="d5" stroke="#82ca9d" name="ミスナール体感温度" strokeWidth={2} dot={false} activeDot={{ r: 5 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
