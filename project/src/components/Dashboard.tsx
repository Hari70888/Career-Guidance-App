import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { CareerInsights } from '../types';

interface DashboardProps {
  responses: { [key: number]: string };
  insights: CareerInsights | null;
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard: React.FC<DashboardProps> = ({ responses, insights }) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Example data processing based on responses
  const skillRatings: { [key: string]: number } = {
    'Poor': 0,
    'Average': 0,
    'Good': 0,
    'Excellent': 0,
  };

  Object.values(responses).forEach(response => {
    if (skillRatings.hasOwnProperty(response)) {
      skillRatings[response]++;
    }
  });

  const pieData = Object.keys(skillRatings).map(key => ({
    name: key,
    value: skillRatings[key],
  }));

  const barData = [
    { name: 'Extrovert', value: Object.values(responses).filter(r => r === 'High-paying job' || r === 'Job that aligns with passions' || r === 'A balance of both').length },
    { name: 'Introvert', value: Object.values(responses).filter(r => r !== 'High-paying job' && r !== 'Job that aligns with passions' && r !== 'A balance of both').length }
  ];

  const handlePieClick = (data: any, index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="text-2xl font-bold mb-6">Interactive Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-3">Skill Ratings Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onClick={handlePieClick}
              animationDuration={500}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </div>

        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-3">Personality Traits Analysis</h3>
          <BarChart width={400} height={400} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="#8884d8" 
              animationDuration={500}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>

      {insights && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Career Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3">Overview</h4>
              <p className="text-gray-600 mb-2">{insights.overview.description}</p>
              <p className="text-gray-600"><strong>Demand:</strong> {insights.overview.demand}</p>
              <p className="text-gray-600"><strong>Work Environment:</strong> {insights.overview.workEnvironment}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3">Skills Required</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h5 className="font-medium mb-1">Technical Skills</h5>
                  <ul className="text-gray-600">
                    {insights.skills.technical.map((skill, index) => (
                      <li key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Soft Skills</h5>
                  <ul className="text-gray-600">
                    {insights.skills.soft.map((skill, index) => (
                      <li key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3">Salary Trends</h4>
              <div className="text-gray-600">
                <p>Entry Level: ${insights.salary.entryLevel.toLocaleString()}</p>
                <p>Mid Level: ${insights.salary.midLevel.toLocaleString()}</p>
                <p>Senior Level: ${insights.salary.seniorLevel.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3">Growth Potential</h4>
              <div className="text-gray-600">
                <p><strong>Outlook:</strong> {insights.growth.outlook}</p>
                <p><strong>Growth Rate:</strong> {insights.growth.growthRate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};
