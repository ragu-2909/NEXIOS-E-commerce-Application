import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { useSelector } from "react-redux";
import NoOrdersComponent from "../../Loaders/NoOrdersComponent"
// Filter component for date column
const DateFilter = ({ column: { filterValue, setFilter } }) => (
  <input
    type="date"
    value={filterValue || ""}
    onChange={(e) => setFilter(e.target.value || undefined)}
    className="form-input px-2 py-1 rounded border border-gray-300"
  />
);

const LatestOrdersHome = () => {
  const orders = useSelector((state) => state.ordersData.orders);
  const themeMode = useSelector((state) => state.theme.mode);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (orders && orders.sales) {
      setSales(orders.sales);
    }
  }, [orders]);

  const extractDate = (orderDateTime) => {
    const [date, time] = orderDateTime.split(" "); // Split the date and time
    return date; // Return the date part (DD/MM/YYYY)
  };

  const columns = useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Customer", accessor: "custName" },
      {
        Header: "Date",
        accessor: "orderDateTime", // Use the original field name
        Cell: ({ value }) => extractDate(value), // Apply extractDate function to the cell value
        Filter: DateFilter, // If you have a custom date filter, keep it here
      },
      { Header: "Status", accessor: "orderStatus" },
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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: sales,
      initialState: { pageSize: 5 },
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
      className={`w-full h-full flex flex-col rounded-lg p-4 ${
        themeMode === "theme-mode-dark" ? "bg-black text-whte" : "gradient-bg-light text-gray-800"
      }`}
    >
     <h1 className={`text-2xl ${
        themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-black'
      } font-bold mb-4 2xl:mb-6 tracking-wide`}>Latest Orders</h1>
    {
      sales.length < 1 ? (
         <div className="w-full h-full mb-8 flex justify-center items-center"><NoOrdersComponent /></div>
      ) : 
    (
      <>
        <div className="w-full flex justify-between items-center">
       
        {/* Search Bar */}
        <div className=" mb-2 2xl:mb-4 w-[60%] justify-self-end">
            <input
      type="text"
      placeholder="Search by order ID or customer"
      value={globalFilter || ""}
      onChange={handleGlobalSearch}
      className={`lg:w-full px-4 py-1 3xl:py-2 rounded-md shadow focus:outline-none focus:ring-0 focus:border-transparent ${
        themeMode === "theme-mode-dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    />  
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden flex-grow">
        <table {...getTableProps()} className="w-full text-left border-collapse">
          <thead>
            {headerGroups.map((headerGroup, hgsindex) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={hgsindex}
                className={`uppercase text-sm ${
                  themeMode === "theme-mode-dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                }`}
              >
                {headerGroup.headers.map((column, hindex) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={hindex}
                    className={`py-3 px-4 font-semibold tracking-wide border-b hover:text-[#26DC5C] transition cursor-pointer ${
                      themeMode === "theme-mode-dark" ? "border-gray-700" : "border-gray-300"
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
          <tbody {...getTableBodyProps()}>
            {page.map((row,rindex) => {
              prepareRow(row);
              return (
                <tr   
                  {...row.getRowProps()}
                  className={`hover:bg-emerald-500 hover:text-black transition-colors`}
                  // key={rindex}
                >
                  {row.cells.map((cell,cindex) => {
                    let cellContent = cell.render("Cell");
                    if (cell.column.id === "orderStatus") {
                      // Apply correct conditional styling for 'Active' status
                      cellContent = (
                        <span
                          className={`${
                            cellContent !== "Active" ? "text-green-500" : "text-red-500" /* there is a bug , when true red , false green it was showing */
                          }`}
                        >
                          {cellContent}
                        </span>
                      );
                    }

                    return (
                      <td  
                        {...cell.getCellProps()}
                        className={`py-3 px-4 text-sm border-b ${
                          themeMode === "theme-mode-dark" ? "border-gray-800 text-gray-300" : "border-gray-300 text-gray-600"
                        }`} 
                        // key={rindex+cindex}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className={`mt-4 flex justify-between items-center py-2 px-4 ${
          themeMode === "theme-mode-dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-3 py-1 rounded-md ${
            themeMode === "theme-mode-dark" ? "bg-gray-700 text-gray-300 disabled:bg-gray-600" : "bg-gray-200 text-gray-600 disabled:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <span>
          Page <strong>{pageIndex + 1}</strong> of {pageOptions.length}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-3 py-1 rounded-md ${
            themeMode === "theme-mode-dark" ? "bg-gray-700 text-gray-300 disabled:bg-gray-600" : "bg-gray-200 text-gray-600 disabled:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
      </>
    )
    }
    </div>
  );
};

export default LatestOrdersHome;
