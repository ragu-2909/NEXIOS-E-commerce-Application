import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { LuPackagePlus, LuFilePenLine } from "react-icons/lu";
import LoadingComponent from "../../Loaders/LoadingComponent";
import NoProductComponent from "../../Loaders/NoProductComponent";
import { setSelectProduct } from "../../../redux/features/SelectProductSlice";
// import TestTable from "../discounts/TestTable";

function ProductList() {
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const themeMode = useSelector((state) => state.theme.mode);
  const colorMode = useSelector((state) => state.theme.color);
  // console.log("products recieved or changed ");
  const parts = colorMode.split("-");
  const result = parts.length > 2 ? parts[2] : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(setSelectProduct(products[0])); // Set the first product as selected
    }
  }, [status, products]);

  const handleAddProduct = () => {
    navigate("/hyperTrade/inventory/addproduct");
  };

  const handleDelete = () => {
    navigate("/hyperTrade/inventory/deleteproduct");
  };

  const handleUpdateProduct = () => {
    navigate("/hyperTrade/inventory/updateproduct");
  };

  const handleEditStock = () => {
    navigate("/hyperTrade/inventory/editstock");
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "Product ID",
      //   accessor: "_id", // Corresponds to the _id property in the product
      // },
      {
        Header: "Product ID",
        accessor: "_id", // Corresponds to the _id property in the product
        Cell: ({ value }) => (
          <div className="max-w-[10ch] overflow-hidden text-ellipsis">
            {value.length > 10 ? value.substring(0, 10) + "..." : value}
          </div>
        ),
      },
      {
        Header: "Product Name",
        accessor: "name", // Corresponds to the name property in the product
      },
      {
        Header: "Price",
        accessor: "price", // Corresponds to the price property in the product
      },
      {
        Header: "Stock",
        accessor: "total", // Corresponds to the total property in the product
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
      data: products,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleGlobalSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  const handleRowClick = (row) => {
    console.log("Selected Product:", row);
    dispatch(setSelectProduct(row));
  };

  return (
    <div
      className={`w-full h-full rounded-lg p-4 2xl:p-6 flex flex-col shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-txt-white"
          : "gradient-bg-light text-gray-800"
      }`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold 2xl:mb-6 mb-2  tracking-wide">Product List</h1>
      {products.length === 0 && status === "succeeded" ? (
        <div className="w-full h-full flex justify-center items-center">
          <NoProductComponent />
        </div>
      ) : (
        <>
          {/* Add Product and Search Container */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center 2xl:mb-6 mb-2">
            {/* Add Product Button */}
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-3 py-2 transition-all mb-4 sm:mb-0 ${
                themeMode === "theme-mode-dark"
                  ? "bg-[#26DC5C] text-black hover:bg-[#26DC5C]"
                  : "bg-[#26DC5C] text-white hover:bg-[#26DC5C]"
              }`}
              onClick={handleAddProduct}
            >
              <LuPackagePlus className="w-5 h-5" />
              <span>Add Product</span>
            </button>

            {/* Search Input */}
            <input
              type="text"
              value={globalFilter || ""}
              onChange={handleGlobalSearch}
              placeholder="Search products..."
              className={`lg:w-[60%] sm:max-w-md px-3 py-1 2xl-py-2 rounded-md shadow focus:ring-2 focus:outline-none ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            />
          </div>

          {/* Table Container */}
          <div className="flex-grow flex flex-col">
            {status !== "succeeded" ? (
              <div className="flex-grow flex justify-center items-center">
                <LoadingComponent />
              </div>
            ) : (
              <div
                className={`rounded-lg p-2 2xl:p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "gradient-bg-dark"
                    : "bg-transparent"
                }`}
              >
                {/* Table */}
                <div className="max-h-[50vh] sm:max-h-full">
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
                            onClick={() => handleRowClick(row.original)}
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
            className={`flex justify-between items-center rounded-lg 2xl:mt-2 py-2 px-4 shadow-md ${
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

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between mt-3 2xl:mt-6 gap-4">
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-3 py-1 2xl-py-2 transition ${
                themeMode === "theme-mode-dark"
                  ? "bg-orange-500 text-black hover:bg-orange-600"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              }`}
              onClick={handleUpdateProduct}
            >
              <LuFilePenLine className="w-5 h-5" />
              <span>Update Product</span>
            </button>
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-3 py-1 2xl-py-2 transition ${
                themeMode === "theme-mode-dark"
                  ? "bg-blue-500 text-black hover:bg-blue-600"
                  : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
              onClick={handleEditStock}
            >
              <FaPenToSquare className="w-5 h-5" />
              <span>Edit Stock</span>
            </button>
            <button
              className={`flex items-center gap-2 rounded-lg font-semibold shadow-md px-3 py-1 2xl-py-2 transition ${
                themeMode === "theme-mode-dark"
                  ? "bg-red-600 text-black hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={handleDelete}
            >
              <FaTrashCan className="w-5 h-5" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
