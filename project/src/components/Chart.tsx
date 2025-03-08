import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const Chart: React.FC<ChartProps> = ({ data }) => {

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sample Data',
        data: data.values,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
