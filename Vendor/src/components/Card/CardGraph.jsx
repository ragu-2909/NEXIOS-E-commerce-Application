import React from 'react';
import {
  LineChart,
  Line,
//   Tooltip,
  ResponsiveContainer
} from 'recharts';

const CardGraph = ({ data , dataKey , dataColor }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        {/* Removed CartesianGrid for a cleaner graph without grid lines */}
        
        {/* Line component for the graph */}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={dataColor}
          strokeWidth={3}
          dot={false} // Remove dots on the graph
        />
        
        {/* Tooltip to display the value when hovered */}
        {/* <Tooltip />  diabling it temp as causing overflow */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CardGraph;
