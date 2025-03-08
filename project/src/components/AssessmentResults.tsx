import React from 'react';
import { Bar } from 'react-chartjs-2';

const AssessmentResults: React.FC<{ results: { label: string; value: number }[] }> = ({ results }) => {
  const data = { 
    labels: results.map((result) => result.label),
    datasets: [
      {
        label: 'Assessment Results',
        data: results.map((result) => result.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Assessment Results</h2>
      <Bar data={data} />
    </div>
  );
};

export default AssessmentResults;
