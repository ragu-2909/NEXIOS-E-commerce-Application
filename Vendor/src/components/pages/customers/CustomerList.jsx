import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { useSelector } from "react-redux";
import LoadingComponent from "../../Loaders/LoadingComponent";
import NoCustomersComponent from "../../Loaders/NoCustomersComponent";

function CustomerList() {
  const themeMode = useSelector((state) => state.theme.mode);
  const colorMode = useSelector((state) => state.theme.color);
  const orders = useSelector((state) => state.ordersData.orders);
  const status = useSelector((state) => state.ordersData.status);

  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Function to extract unique customers
  const extractUniqueCustomers = (sales) => {
    const uniqueCustomers = new Map();
    sales.forEach((sale) => {
      if (!uniqueCustomers.has(sale.custId)) {
        uniqueCustomers.set(sale.custId, {
          custId: sale.custId,
          custName: sale.custName,
          custPic: sale.custPic || "/default-avatar.png",
        });
      }
    });
    return [...uniqueCustomers.values()];
  };

  // Update sales data when orders change
  useEffect(() => {
    if (orders && orders.sales) {
      setSales(orders.sales);
      // console.log("Sales data updated:", orders.sales);
    }
  }, [orders]);

  // Update customers data when sales change
  useEffect(() => {
    if (sales.length > 0) {
      setCustomers(extractUniqueCustomers(sales));
    } else {
      setCustomers([]);
    }
  }, [sales]);

  const columns = useMemo(
    () => [
      {
        Header: "Profile Pic",
        accessor: "custPic",
        Cell: ({ value }) => (
          <div className="w-10 h-10 rounded-full border-2 border-[#26DC5C]">
            <img
            src={value}
            alt="Profile Pic"
            className="w-full h-full rounded-full "
          />
          </div>  
        ),
      },
      {
        Header: "Customer ID",
        accessor: "custId",
      },
      {
        Header: "Customer Name",
        accessor: "custName",
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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: customers,
      initialState: { pageSize: 3 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleGlobalSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div
      className={`w-full h-full rounded-lg p-6 flex flex-col shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-txt-white"
          : "gradient-bg-light text-gray-800"
      }`}
    >
     { customers.length === 0 ? (<h1 className="text-3xl font-bold mb-6 tracking-wide">Customer List</h1>) : (null) }
      {customers.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
            {/* <h1 className="text-3xl font-bold mb-6 tracking-wide">Customer List</h1> */}
            <NoCustomersComponent />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 2xl:mb-6">
            {
              window.innerHeight < 1600 ? (<h1 className="text-3xl font-bold tracking-wide">Customer List</h1>) :
              null
            }
            <input
              type="text"
              value={globalFilter || ""}
              onChange={handleGlobalSearch}
              placeholder="Search customers..."
              className={`lg:w-[60%] sm:max-w-md px-4 py-2 rounded-md shadow focus:ring-2 focus:outline-none ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            />
          </div>

          <div className="flex-grow flex flex-col">
            {(status !== "succeeded" && customers.length !== 0) ? (
              <div className="flex-grow flex justify-center items-center">
                <LoadingComponent />
              </div>
            ) : (
              <div
                className={`flex-grow rounded-lg p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "gradient-bg-dark"
                    : "bg-transparent"
                }`}
              >
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
                      {page.map((row) => {
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

          <div
            className={`2xl:mt-4 mt-3 flex justify-between items-center rounded-lg 2xl:py-2 px-4 shadow-md ${
              themeMode === "theme-mode-dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`px-3 py-1 text-sm rounded-md disabled:cursor-not-allowed transition-all ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-700 text-gray-300 disabled:bg-gray-600 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-600 disabled:bg-gray-300 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <span
              className={`text-sm ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Page <strong>{pageIndex + 1}</strong> of {pageOptions.length}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`px-3 py-1 text-sm rounded-md disabled:cursor-not-allowed transition-all ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-700 text-gray-300 disabled:bg-gray-600 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-600 disabled:bg-gray-300 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerList;
