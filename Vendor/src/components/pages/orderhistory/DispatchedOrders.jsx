import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Checkbox } from "../discounts/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { FaTruck } from "react-icons/fa6";
import PDLoadingComponent from "../../Loaders/PDLoadingComponent";
import { updateDeliveryStatus } from "../../../redux/features/OrdersDataSlice";

function DispatchedOrders() {
    const dispatch = useDispatch()
  const themeMode = useSelector((state) => state.theme.mode);
  const colorMode = useSelector((state) => state.theme.color);
  const orders = useSelector((state) => state.ordersData.orders);
  const status = useSelector((state) => state.ordersData.status);

  const [sales, setSales] = useState([]);
  const [dispatchedOrders, setDispatchedOrders] = useState([]);

 // Example driver names
const driverNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"];

// Helper function to assign a random driver name
const assignRandomDriver = () => {
  return driverNames[Math.floor(Math.random() * driverNames.length)];
};

useEffect(() => {
    if (orders && orders.sales) {
      setSales(orders.sales);

      // Filter sales where deliveryStatusCode === 2
      const filteredSales = orders?.sales?.filter(
        (sale) => sale.deliveryStatusCode === 2 && sale.deliveryBy === 'self'
      ) || [];

      // Add a random delivery person to each order
      const updatedDispatchedOrders = filteredSales.map((sale) => ({
        ...sale,
        deliveryAgent: assignRandomDriver(), // Add random driver
      }));

      setDispatchedOrders(updatedDispatchedOrders);
    }
  }, [orders]);

  const columns = useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Line ID", accessor: "LineId" },
      {
        Header: "Delivery Agent",
        accessor: "deliveryAgent",
      },
      {
        Header: "Status",
        accessor: "deliveryStatus",
        Cell: ({ value }) => (
          <div className="p-2 max-w-[180px] flex justify-center items-center bg-[#d11aff62] rounded-3xl">
            <p className={`${themeMode === 'theme-mode-dark' ? "text-purple-600" : "text-black"} font-semibold`}>{value}</p>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter, selectedRowIds },
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: dispatchedOrders,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const handleGlobalSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  const handleOutForDelivery = () => {
    // Extract selected orders with their IDs
    const ordersToOutForDelivery = selectedFlatRows.map((row) => ({
      orderId: row.original.orderId,
      LineId: row.original.LineId,
    }));
  
    console.log("Selected Orders:", ordersToOutForDelivery);
  
    // Dispatch updates for each order individually
    ordersToOutForDelivery.forEach((orderToOutForDelivery) => {
      dispatch(updateDeliveryStatus(orderToOutForDelivery));
    });
  };
  

  return (
    <div
      className={`w-full h-full rounded-lg p-6 flex flex-col shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-white"
          : "gradient-bg-light text-gray-800"
      }`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 tracking-wide">Dispatched Orders</h1>
      {dispatchedOrders.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="font-bold text-2xl">No Dispatched orders</p>
        </div>
      ) : (
        <>
          {/* Dispatch Orders and Search Container */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            {/* Search Input */}
            <input
              type="text"
              value={globalFilter || ""}
              onChange={handleGlobalSearch}
              placeholder="Search orders..."
              className={`lg:w-[60%] sm:max-w-md px-4 py-2 rounded-md shadow focus:ring-2 focus:outline-none ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            />

            {/* out for delivery Button */}
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-4 py-2 transition-all mb-4 sm:mb-0 ${
                themeMode === "theme-mode-dark"
                  ? "bg-[#b22cff] text-black hover:bg-[#dc4eff]"
                  : "bg-[#b22cff] text-white hover:bg-[#dc4eff]"
              }`}
              onClick={handleOutForDelivery}
            >
              <FaTruck className="w-5 h-5"  />
              <span>Out for Delivery</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="flex-grow flex flex-col">
            {status !== "succeeded" || !dispatchedOrders ? (
              <div className="flex-grow flex justify-center items-center">
                <PDLoadingComponent />
              </div>
            ) : (
              <div
                className={`flex-grow rounded-lg p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "gradient-bg-dark"
                    : "bg-transparent"
                }`}
              >
                {/* Table */}
                <div className="overflow-x-auto flex-grow max-h-[50vh] sm:max-h-full">
                  <table {...getTableProps()} className="w-full text-left">
                    <thead>
                      {headerGroups.map((headerGroup, hgsindex) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={hgsindex}
                          className={`uppercase text-sm ${
                            themeMode === "theme-mode-dark"
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {headerGroup.headers.map((column, hindex) => (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              key={hindex}
                              className={`py-3 px-4 font-semibold tracking-wide border-b hover:text-[#26DC5C] transition cursor-pointer ${
                                themeMode === "theme-mode-dark"
                                  ? "border-gray-700"
                                  : "border-gray-300"
                              }`}
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className={
                        themeMode === "theme-mode-dark"
                          ? "bg-black"
                          : "bg-white"
                      }
                    >
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={row.id}
                            className={`hover:bg-[#26DC5C] hover:text-black transition-colors cursor-pointer`}
                          >
                            {row.cells.map((cell, cindex) => (
                              <td
                                {...cell.getCellProps()}
                                key={cindex}
                                className={`py-3 px-4 text-sm border-b ${
                                  themeMode === "theme-mode-dark"
                                    ? "border-gray-800"
                                    : "border-gray-300"
                                }`}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DispatchedOrders;
