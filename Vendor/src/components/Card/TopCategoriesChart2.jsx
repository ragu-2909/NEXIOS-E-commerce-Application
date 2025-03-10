import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell,Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const TopCategoriesChart2 = () => {
  const products = useSelector((state) => state.productsData.products);
  const orders = useSelector((state) => state.ordersData.orders);
  const themeMode = useSelector((state) => state.theme.mode);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (orders && orders.sales) {
      setSales(orders.sales);
    }
  }, [orders]);

  

  // Helper to map product IDs to categories and subcategories
  const mapProductToCategory = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? { category: product.category, subCategory: product.subCategory } : null;
  };

  // Aggregate sales data by category
  const categoryData = {};
  const subCategoryData = {};

  sales.forEach((sale) => {
    const mapping = mapProductToCategory(sale.productId);
    if (mapping) {
      const { category, subCategory } = mapping;
      categoryData[category] = (categoryData[category] || 0) + sale.saleRevenue;
      subCategoryData[subCategory] = (subCategoryData[subCategory] || 0) + sale.saleRevenue;
    }
  });

  // Convert aggregated data to chart format
  const categoryArray = Object.entries(categoryData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const subCategoryArray = Object.entries(subCategoryData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Handle case where all sales are in the same category
  const allSameCategory = categoryArray.length === 1;
  const displayData = allSameCategory
    ? subCategoryArray.sort((a, b) => b.value - a.value) // Top subcategories
    : categoryArray.sort((a, b) => b.value - a.value); // Top categories

  // Spread into top 1, 2, 3 and others
  const topData = displayData.slice(0, 3);
  const othersValue = displayData.slice(3).reduce((sum, item) => sum + item.value, 0);
  if (othersValue > 0) {
    topData.push({ name: "Others", value: othersValue });
  }

  // Chart Colors
  const COLORS = themeMode === "theme-mode-dark" ? ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"] : ["#6ab04c", "#2980b9", "#FFBB28", "#FF8042"];

  return (
    <div className={`w-full h-full p-4 flex flex-col shadow-lg ${themeMode === "theme-mode-dark"
          ? "text-txt-white"
          : "text-gray-800"}`}>
      <h3 className="text-center text-2xl font-semibold mb-4">
        {allSameCategory ? "Top Subcategories" : "Top Categories"}
      </h3>
      {(!products.length || !sales.length) ? 
      ( <div className="w-full h-full mb-8 flex justify-center items-center"><p className="text-xl font-bold ">No Orders Available</p></div>) 
      :
      (
        <>
        
        
      {/* Container for the chart with a smaller responsive container */}
      <div className="rounded-xl 3xl:h-[64%] h-[60%]">
        <ResponsiveContainer width="100%" height="100%" style={{ border: 'none', margin: 0, padding: 0 }}>
          <PieChart style={{ border: 'none', margin: 0, padding: 0 }}>
            <Pie
              data={topData}
              dataKey="value"
              nameKey="name"
              cx="50%"  // Adjusting cx and cy to fit within a smaller container
              cy="50%"  // This ensures the center of the pie chart is aligned
              startAngle={360}
              endAngle={0}
              innerRadius={95}  // Reduced the inner radius to fit more in the container
              outerRadius={125}  // Adjusted the outer radius for smaller chart
              paddingAngle={3} // Gap between arches
              cornerRadius={7} // Rounded edges
              labelLine={false} // Disable label line
            >
              {topData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={themeMode === "theme-mode-dark" ? "fff" : "#fff"} />
              ))}
            </Pie>
              <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Labels Section */}
      <div className="mt-3 space-y-2 overflow-hidden">
        {topData.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-[0.90rem] font-semibold">{entry.name}</span>
            </div>
            <div className="text-[0.80rem]">
              {((entry.value / sales.reduce((sum, sale) => sum + sale.saleRevenue, 0)) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
        </>
      )

      }
    </div>
  );
};

export default TopCategoriesChart2;
