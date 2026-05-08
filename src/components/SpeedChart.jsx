import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

export function SpeedChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd3" vertical={true} horizontal={true} />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
          stroke="#a3a3a3"
          fontSize={10}
          angle={-45}
          textAnchor="end"
          tickMargin={5}
        />
        <YAxis 
          domain={['dataMin - 100', 'dataMax + 100']} 
          stroke="#a3a3a3"
          fontSize={10}
          tickFormatter={(val) => val.toLocaleString()}
        />
        <Tooltip 
          labelFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
          formatter={(value) => [`${Math.round(value)} km/h`, 'Speed']}
          contentStyle={{ backgroundColor: '#fefdfa', borderColor: '#e0dcd3', borderRadius: '8px', fontSize: '12px' }}
        />
        <Legend verticalAlign="top" height={36} iconType="rect" formatter={(value) => <span style={{ color: '#666', fontSize: '12px' }}>{value}</span>} />
        <Line 
          name="ISS Speed (km/h)"
          type="monotone" 
          dataKey="speed" 
          stroke="#ef4444" 
          strokeWidth={2}
          dot={{ r: 2, fill: '#ef4444' }}
          activeDot={{ r: 4 }} 
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
