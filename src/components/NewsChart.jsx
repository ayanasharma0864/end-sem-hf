import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CATEGORIES = ['technology', 'science', 'general', 'business'];
const COLORS = ['#aa3bff', '#3b82f6', '#10b981', '#f59e0b'];

export function NewsChart({ currentCategory, setCategory }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // In a real app, we might fetch the total results for all categories.
    // To avoid hitting API limits here, we simulate the distribution visually,
    // but the chart remains interactive.
    const mockData = CATEGORIES.map((cat, i) => ({
      name: cat,
      value: cat === currentCategory ? 35 : 20 + (i * 2), // Slightly highlight current
      actualName: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
    setData(mockData);
  }, [currentCategory]);

  const onPieClick = (data, index) => {
    setCategory(data.name);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-lg shadow-lg text-sm">
          <span className="font-semibold capitalize" style={{ color: payload[0].payload.fill }}>
            {payload[0].payload.name}
          </span>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full pb-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onClick={onPieClick}
            className="cursor-pointer focus:outline-none"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                opacity={entry.name === currentCategory ? 1 : 0.6}
                className="transition-opacity duration-300 hover:opacity-100"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            formatter={(value, entry) => (
              <span className={`text-xs capitalize ${entry.payload.name === currentCategory ? 'font-bold' : ''}`}>
                {value}
              </span>
            )}
            onClick={(e) => setCategory(e.value)}
            className="cursor-pointer"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
