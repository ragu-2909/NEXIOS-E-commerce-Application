import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaX, FaHashtag, FaCalendar, FaMapLocationDot } from "react-icons/fa6";

const OrderDetailsModal = ({
  isOpen,
  onClose,
  currentOrders,
  selectedSaleIds,
}) => {
  const [selectedSale, setSelectedSale] = useState(null);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (selectedSaleIds) {
      // Filter currentOrders using selectedSaleIds
      const filteredOrders = currentOrders.find(
        (order) =>
          order.id === selectedSaleIds.id &&
          order.orderId === selectedSaleIds.orderId &&
          order.LineId === selectedSaleIds.LineId
      );

      // Set the selectedSale with individual order details
      setSelectedSale(filteredOrders);
    }
  }, [currentOrders, selectedSaleIds]);

  if (!isOpen) return null;

  return (
    <>
      {!selectedSaleIds && !selectedSale ? (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div
            className={`${
              themeMode === "theme-mode-dark"
                ? "gradient-bg-dark text-txt-white"
                : "gradient-bg-light text-black"
            } rounded-lg w-full max-w-md relative shadow-2xl`}
          >
            <div className="p-6 space-y-6 text-center">
              {/* Header with close button */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#26DC5C] to-teal-500 bg-clip-text text-transparent">
                  No Order Selected
                </h2>
                <button
                  className="text-gray-600 hover:text-[#26DC5C] transition-colors"
                  onClick={onClose}
                >
                  <FaX className="text-xl" />
                </button>
              </div>

              {/* Message */}
              <p className={`${themeMode === "theme-mode-dark" ? "text-gray-200" : "text-black"}`}>
                Please select an order from the list to view details.
              </p>

              {/* Footer */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`bg-[#df2b2b] hover:bg-[#e04242] ${
                    themeMode === "theme-mode-dark"
                      ? "text-black"
                      : "text-white"
                  } py-3 px-6 rounded-lg font-semibold shadow-md transition-all duration-300`}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div
            className={`${
              themeMode === "theme-mode-dark"
                ? "gradient-bg-dark text-txt-white"
                : "gradient-bg-light text-black"
            } rounded-lg w-full max-w-3xl h-[80%] relative shadow-lg`}
          >
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#26DC5C] to-teal-500 bg-clip-text text-transparent">
                  Order Details
                </h2>
                <button className="transition-colors" onClick={onClose}>
                  <FaX className="text-lg" />
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`${
                    themeMode === "theme-mode-dark"
                      ? "bg-gradient-to-r from-gray-900/70 to-gray-800/70 border border-gray-700"
                      : "bg-white shadow-md"
                  } p-3 rounded-lg`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FaHashtag className="text-[#26DC5C]" />
                      <span className="text-sm">
                        Order ID: {selectedSale?.orderId || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-[#26DC5C]" />
                      <span className="text-sm">
                        {selectedSale?.orderDateTime || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div
                  className={`${
                    themeMode === "theme-mode-dark"
                      ? "bg-gradient-to-r from-gray-900/70 to-gray-800/70 border border-gray-700"
                      : "bg-white shadow-md"
                  } p-3 rounded-lg`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full border-2 border-[#26DC5C] overflow-hidden">
                      <img
                        src={selectedSale?.custPic}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {selectedSale?.custName || "John Anderson"}
                      </h3>
                      <p className="text-xs">
                        Customer ID: {selectedSale?.custId || "CUS-789456"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div
                className={`${
                  themeMode === "theme-mode-dark"
                    ? "bg-gradient-to-r from-gray-900/70 to-gray-800/70 border border-gray-700"
                    : "bg-white shadow-md"
                } p-3 rounded-lg`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4">
                    <div className="aspect-square rounded-lg border border-[#26DC5C]/30">
                      <img
                        src={selectedSale?.image}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    <h3 className="text-lg font-semibold">
                      {selectedSale?.productName ||
                        "Premium Wireless Headphones"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm">Variant</p>
                        <p>{selectedSale?.variant || "Matte Black"}</p>
                      </div>
                      <div>
                        <p className="text-sm">Quantity</p>
                        <p>{selectedSale?.quantity || "2"}</p>
                      </div>
                      <div>
                        <p className="text-sm">Revenue</p>
                        <p className="text-[#357afa] font-semibold">
                          ₹{selectedSale?.itemRevenue || "599.98"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Profit</p>
                        <p className="text-green-400 font-semibold">
                          ₹{selectedSale?.itemProfit || "179.99"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div
                className={`${
                  themeMode === "theme-mode-dark"
                    ? "bg-gradient-to-r from-gray-900/70 to-gray-800/70 border border-gray-700"
                    : "bg-white shadow-md"
                } p-3 rounded-lg`}
              >
                <h3 className="text-sm font-semibold mb-2">
                  Delivery Information
                </h3>
                <div className="space-y-1">
                  <p className="text-xs">
                    <FaMapLocationDot className="inline text-[#26DC5C] mr-2" />
                    {selectedSale?.deliveryAdd || "Mars base"}
                  </p>
                  <p className="text-xs">
                    <FaHashtag className="inline text-[#26DC5C] mr-2" />
                    {selectedSale?.deliveryPincode || "MRS111"}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`bg-[#df2b2b] ${
                    themeMode === "theme-mode-dark"
                      ? "text-black"
                      : "text-white"
                  } py-2 px-4 mt-5 rounded-lg font-semibold shadow-md transition-all duration-300`}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsModal;
