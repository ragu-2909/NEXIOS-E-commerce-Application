import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Checkbox } from "./Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuPercent } from "react-icons/lu";
import LoadingComponent from "../../Loaders/LoadingComponent";
import { setSelectDiscountedProduct } from "../../../redux/features/SelectDiscountedProductSlice";
import NoLatestProductComponent from "../../Loaders/NoLatestProductComponent";
function DiscountProductList() {
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "_id",
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Cost Price",
        accessor: "costPrice",
      },
      {
        Header: "Selling Price",
        accessor: "price",
        Cell: ({ row }) => {
          const originalPrice = row.original.price;
          const discount = row.original.discount?.vendor?.disc || 0; // Get discount, default to 0 if not available
          const discountedPrice =
            originalPrice - originalPrice * (discount / 100);

          return <span>{discountedPrice.toFixed(2)}</span>; // Display the discounted price rounded to 2 decimal places
        },
      },
      {
        Header: "Stock",
        accessor: "total",
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
    state: { pageIndex, globalFilter, selectedRowIds },
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
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

  const handleApplyDiscount = () => {
    const discountedData = selectedFlatRows.map((row) => row.original._id);

    dispatch(setSelectDiscountedProduct(discountedData));
    console.log("Selected discounted products:", discountedData);

    navigate("/hyperTrade/discounts/applydiscount");
    // onOpen();
  };
  return (
    <div
      className={`w-full h-full rounded-lg p-6 flex flex-col shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-txt-white"
          : "gradient-bg-light text-gray-800"
      }`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 tracking-wide">Product List</h1>
      {products.length === 0 && status === "succeeded" ? (
        <div className="w-full h-full flex justify-center items-center">
          <NoLatestProductComponent />
        </div>
      ) : (
        <>
          {/* Apply Discount and Search Container */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            {/* Apply Discount Button */}
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-4 py-2 transition-all mb-4 sm:mb-0 ${
                themeMode === "theme-mode-dark"
                  ? "bg-[#26DC5C] text-black hover:bg-[#26DC5C]"
                  : "bg-[#26DC5C] text-white hover:bg-[#26DC5C]"
              }`}
              onClick={handleApplyDiscount}
            >
              <LuPercent className="w-5 h-5" />
              <span>Apply Discount</span>
            </button>

            {/* Search Input */}
            <input
              type="text"
              value={globalFilter || ""}
              onChange={handleGlobalSearch}
              placeholder="Search products..."
              className={`lg:w-[60%] sm:max-w-md px-4 py-2 rounded-md shadow focus:ring-2 focus:outline-none ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            />
          </div>

          {/* Table Container */}
          <div className="flex flex-col">
            {status !== "succeeded" || !products ? (
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

          {/* Pagination */}
          <div
            className={`mt-1 flex justify-between items-center rounded-lg py-2 px-4 shadow-md ${
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

export default DiscountProductList;
