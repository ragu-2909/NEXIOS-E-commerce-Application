import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const DonutChart2 = ({ data }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  // Define colors based on the current theme
  const colors =
    themeMode === "theme-mode-dark"
      ? ["#2662D9", "#2EB88A", "#AF57DB", "#E88C30", "#E23670"]
      : ["#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FF9C33", "#8E44AD"];

  // Total value of all products
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  // Calculate the percentage contribution for each product
  const getPercentage = (value) => ((value / totalValue) * 100).toFixed(2);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={1}
            labelLine={false} // Disable label lines
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]} // Assign colors based on theme
                stroke={themeMode === "theme-mode-dark" ? "none" : "#fff"} // Remove border in dark mode, white border in light mode
                strokeWidth={themeMode === "theme-mode-dark" ? 0 : 2} // Set stroke width for light mode
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { name, value } = payload[0];
                return (
                  <div
                    className={`p-3 rounded-lg shadow-lg text-center ${
                      themeMode === "theme-mode-dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="font-semibold">{name}</p>
                    <p>Value: {value}</p>
                    <p>Contribution: {getPercentage(value)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart2;
