import React from 'react';
import { useSelector } from 'react-redux';
const FinancialCard = () => {
   const orders = useSelector((state) => state.ordersData.orders);
   const products = useSelector((state) => state.productsData.products);
   
   const totalAssetValue = () => {
    return products.reduce((result, product) => result + product.price * product.total, 0);
};

  return (
    <div className="w-full h-full mx-auto">
      {/* Single Financial Card */}
      <div className="h-full bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 rounded-lg shadow-lg3xl:p-6 p-3 hover:shadow-2xl transition-all duration-300 backdrop-blur-lg bg-opacity-50 border border-indigo-600" >
        <div className="">
          <div>
            <h3 className="text-sm font-medium text-gray-300">Net Value</h3>
            <div className="3xl:mt-2 mt-1 flex items-baseline">
              <span className="lg:text-[1.4rem] 2xl:text-3xl font-semibold text-white">₹{orders ? (orders.totalRevenue + totalAssetValue())?.toLocaleString('en-IN') : 0}</span>
              <span className="ml-2 lg:text-[0.75rem] 3xl:text-sm text-green-400">+{(products.length > 0 && (orders.totalRevenue + totalAssetValue()) > 0) ? "15.3" : "0"}%</span>
            </div>
          </div>
          <div className="finGrid grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300">Revenue</h4>
              <p className="mt-1 2xl:mt-2 text-lg font-semibold text-white">₹{orders ? orders.totalRevenue?.toLocaleString('en-IN') : 0}</p>
              <div className={`mt-1 lg:text-[0.75rem] 2xl:text-sm text-green-400 `}>+{(products.length > 0 && orders.totalRevenue > 0) ? "12.5" : "0"}%</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300">Profit</h4>
              <p className="mt-1 2xl:mt-2 text-lg font-semibold text-white">₹{orders ? orders.totalProfits?.toLocaleString('en-IN') :  0}</p>
              <div className={`mt-1 lg:text-[0.75rem] 2xl:text-sm text-green-400`}>+{(products.length > 0 && orders.totalProfits > 0) ? "8.2" : "0"}%</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300">Assets</h4>
              <p className="mt-1 2xl:mt-2 text-lg font-semibold text-white">₹{orders ? totalAssetValue()?.toLocaleString('en-IN') :  0}</p>
              <div className={`mt-1 lg:text-[0.75rem] 2xl:text-sm text-green-400`}>+{(products.length > 0 && totalAssetValue() > 0) ? "5.8" : "0"}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
