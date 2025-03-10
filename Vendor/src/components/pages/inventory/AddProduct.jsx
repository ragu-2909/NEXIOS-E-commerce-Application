import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaX, FaRegTrashCan } from "react-icons/fa6";
import Select from "react-select";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../redux/features/ProductsDataSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import categoryData from "./categoryData.json";

const hasVariantSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  costPrice: z.number().min(1, "Price must be greater than 0"),
  sellingPrice: z.number().min(1, "Price must be greater than 0"),
  weight: z.number(0.1, "weight must be greater than 100g or 0.1kg"),
  description: z.string().min(1, "Description is required"),
  category: z
    .object({
      label: z.string().min(1, "Category is required"),
      value: z.string().min(1, "Category is required"),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Category is required",
    }),
  subcategory: z
    .object({
      label: z.string().min(1, "Subcategory is required"),
      value: z.string().min(1, "Subcategory is required"),
    })
    .nullable()
    .refine((val) => {
      const categorySelected = val?.category?.value;

      if (categorySelected && !val) {
        return false;
      }

      return true;
    }, "Subcategory is required if category is selected"),

  delivery: z
    .enum(["company", "self"], {
      errorMap: () => ({ message: "Please select a valid delivery method." }),
    })
    .refine((value) => ["company", "self"].includes(value), {
      message: "Invalid delivery method.",
    }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  images: z
    .array(z.string().url("Must be a valid URL"))
    .max(4, "You can upload a maximum of 4 images"),
  hasVariant: z.literal(true),
  variantType: z.string().nullable(),
  variants: z
    .array(
      z.object({
        type: z.string().min(1, "Variant type is required"),
        quantity: z.number().min(1, "Quantity must be greater than 0"),
      })
    )
    .optional(),
});

const hasNoVariantSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  costPrice: z.number().min(1, "Price must be greater than 0"),
  sellingPrice: z.number().min(1, "Price must be greater than 0"),
  weight: z
  .number()
  .min(0.1, { message: "Weight must be greater than 100g or 0.1kg" })
  .positive({ message: "Weight must be a positive number" }),
  description: z.string().min(1, "Description is required"),
  category: z
    .object({
      label: z.string().min(1, "Category is required"),
      value: z.string().min(1, "Category is required"),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Category is required",
    }),
  subcategory: z
    .object({
      label: z.string().min(1, "Subcategory is required"),
      value: z.string().min(1, "Subcategory is required"),
    })
    .nullable()
    .refine((val) => {
      const categorySelected = val?.category?.value;

      if (categorySelected && !val) {
        return false;
      }

      return true;
    }, "Subcategory is required if category is selected"),

  delivery: z
    .enum(["company", "self"], {
      errorMap: () => ({ message: "Please select a valid delivery method." }),
    })
    .refine((value) => ["company", "self"].includes(value), {
      message: "Invalid delivery method.",
    }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  images: z
    .array(z.string().url("Must be a valid URL"))
    .max(4, "You can upload a maximum of 4 images"),
  hasVariant: z.literal(false),
  total: z.number().min(1, "Quantity must be greater than 0"),
});

const productSchema = z.discriminatedUnion("hasVariant", [
  hasNoVariantSchema,
  hasVariantSchema,
]);

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const error = useSelector((state) => state.productsData.error);
  const themeMode = useSelector((state) => state.theme.mode);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    // Map categories to the format react-select expects
    const mappedCategoryOptions = categoryData.map((category) => ({
      value: category.name,
      label: category.name,
    }));
    setCategoryOptions(mappedCategoryOptions);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categoryData.find(
        (cat) => cat.name === selectedCategory.value
      );
      if (category) {
        const mappedSubcategoryOptions = category.subcategories.map((sub) => ({
          value: sub,
          label: sub,
        }));
        setSubcategoryOptions(mappedSubcategoryOptions);
        setSelectedSubcategory(null);
      }
    }
  }, [selectedCategory]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [{ type: "", quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const hasVariantChecked = watch("hasVariant");

  useEffect(() => {
    if (!hasVariantChecked) {
      setValue("variantType", "");
      setValue("variants", []);
    }
  }, [hasVariantChecked, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imagePreviews.length > 4) {
      alert("You can upload a maximum of 4 images");
      return;
    }

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));

    // Update both preview and file states
    setImagePreviews((prevImages) => [...prevImages, ...newImagePreviews]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    setValue("images", [...imagePreviews, ...newImagePreviews]);
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = imageFiles.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);
    setImageFiles(updatedFiles);

    setValue("images", updatedPreviews);
  };

  const onClose = () => {
    navigate("/hyperTrade/inventory");
  
  };
  // const onSubmit = (data) => {
  //   console.log("submit pressed : ", data);

  //   const formattedData = {
  //     name: data.name,
  //     costPrice: data.costPrice,
  //     sellingPrice: data.sellingPrice,
  //     weight: data.weight,
  //     delivery: data.delivery,
  //     description: data.description,
  //     category: selectedCategory ? selectedCategory.value : null, // Using the selected category
  //     subcategory: selectedSubcategory ? selectedSubcategory.value : null, // Using the selected subcategory
  //     hasVariant: data.hasVariant,
  //     variantType: data.hasVariant ? data.variantType : "Null",
  //     quantity: data.variants,
  //     total: data.total,
  //   };

  //   const formData = new FormData();
  //   formData.append("name", formattedData.name);
  //   formData.append("costPrice", formattedData.costPrice);
  //   formData.append("sellingPrice", formattedData.sellingPrice);
  //   formData.append("weight", formattedData.weight);
  //   formData.append("delivery", formattedData.delivery);
  //   formData.append("description", formattedData.description);
  //   formData.append("category", formattedData.category);
  //   formData.append("subcategory", formattedData.subcategory); // Append selected subcategory
  //   formData.append("hasVariant", formattedData.hasVariant);
  //   formData.append("variantType", formattedData.variantType);

  //   const quantityArray = formattedData.quantity?.map((variant) => ({
  //     type: variant.type,
  //     quantity: variant.quantity,
  //   }));

  //   if (formattedData.hasVariant) {
  //     formData.append("quantity", JSON.stringify(quantityArray));
  //   } else {
  //     formData.append(
  //       "quantity",
  //       JSON.stringify([{ type: "original", quantity: formattedData.total }])
  //     );
  //   }

  //   imageFiles.forEach((file) => {
  //     formData.append("images", file);
  //   });

  //   formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  //   });

  //   dispatch(addProduct());

  //   if (status === "succeeded") {
  //     console.log(products);
  //     onClose();
  //   }
  // };

  const onSubmit = (data) => {
    console.log("submit pressed: ", data);

    const formattedData = {
      name: data.name,
      costPrice: data.costPrice,
      price: data.sellingPrice,
      weight: data.weight,
      delivery: data.delivery,
      description: data.description,
      category: selectedCategory ? selectedCategory.value : null,
      subCategory: selectedSubcategory ? selectedSubcategory.value : null,
      hasVariant: data.hasVariant,
      variantType: data.hasVariant ? data.variantType : "Null",
      quantity: data.variants,
      total: data.total,
    };

    const formData = new FormData();

    // Append basic form fields to FormData
    formData.append("name", formattedData.name);
    formData.append("costPrice", formattedData.costPrice);
    formData.append("price", formattedData.price);
    formData.append("weight", formattedData.weight);
    formData.append("delivery", formattedData.delivery);
    formData.append("description", formattedData.description);
    formData.append("category", formattedData.category);
    formData.append("subCategory", formattedData.subCategory);

    // Append additional fields based on variant data
    formData.append("hasVariant", formattedData.hasVariant);
    formData.append("variantType", formattedData.variantType);

    // Handling quantity based on variant
    const quantityArray = formattedData.quantity?.map((variant) => ({
      type: variant.type,
      quantity: variant.quantity,
    }));

    if (formattedData.hasVariant) {
      formData.append("quantity", JSON.stringify(quantityArray)); // Add variants to FormData
    } else {
      formData.append(
        "quantity",
        JSON.stringify([{ type: "original", quantity: formattedData.total }]) // Default quantity if no variant
      );
    }

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    dispatch(addProduct(formData));

    if (status === "succeeded") {
      console.log(products);
      onClose();
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor:
        themeMode === "theme-mode-dark"
          ? "rgb(26,26,26)"
          : "rgb(243, 244, 246)",
      color: themeMode === "theme-mode-dark" ? "white" : "black",
      border: state.isFocused
        ? "1px solid rgb(37, 99, 235)"
        : "1px solid rgb(55, 65 ,81)",
      boxShadow: state.isFocused ? "0 0 0 1px rgb(37, 99, 235)" : "none",
    }),
    singleValue: (base) => ({
      ...base,
      color: themeMode === "theme-mode-dark" ? "white" : "black",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor:
        themeMode === "theme-mode-dark"
          ? "rgb(26,26,26)"
          : "rgb(243, 244, 246)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgb(37, 99, 235)"
        : state.isFocused
        ? "rgb(75, 85, 99)"
        : themeMode === "theme-mode-dark"
        ? "rgb(26,26,26)"
        : "rgb(243, 244, 246)",
      color: themeMode === "theme-mode-dark" ? "white" : "black",
    }),
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm first-letter:backdrop-blur-sm flex items-center justify-center z-10">
      <div
        className={`w-[60%] h-[70%] mb-[80px]  ${
          themeMode === "theme-mode-dark"
            ? "bg-[#0A0A0A] text-txt-white"
            : "gradient-bg-light text-black"
        } rounded-lg  relative p-2 pt-3`}
      >
        {" "}
        <div className="w-full flex items-center justify-end pr-1">
          <button onClick={onClose}>
            <FaX />
          </button>
        </div>
        <div className="pl-4 h-full">
          <h2 className="font-bold text-2xl">Add Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full mt-6">
            <div className="detailsContainer flex gap-4 h-[78%]">
              <div className="part1 w-[50%]">
                {/* Product Name */}
                <div>
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-[90%] ${
                      themeMode === "theme-mode-dark"
                        ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                        : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                    } rounded `}
                  />
                  {errors.name && (
                    <p className="text-[12px] text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Cost Price and Selling Price */}
                <div className="priceContainer w-[90%] flex justify-between">
                  <div className="w-[45%]">
                    <label className="block mb-2">Cost Price</label>
                    <input
                      type="number"
                      {...register("costPrice", { valueAsNumber: true })}
                      className={`w-full ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                          : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                      } rounded `}
                    />
                    {errors.costPrice && (
                      <p className="text-[12px] text-red-600">
                        {errors.costPrice.message}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <label className="block mb-2">Selling Price</label>
                    <input
                      type="number"
                      {...register("sellingPrice", { valueAsNumber: true })}
                      className={`w-full ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                          : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                      } rounded `}
                    />
                    {errors.sellingPrice && (
                      <p className="text-[12px] text-red-600">
                        {errors.sellingPrice.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2">Description</label>
                  <textarea
                    {...register("description")}
                    className={`w-[90%] ${
                      themeMode === "theme-mode-dark"
                        ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                        : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                    } rounded `}
                  />
                  {errors.description && (
                    <p className="text-[12px] text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Product Weight and Delivery Method */}
                <div className="delwt flex gap-4">
                  <div>
                    <label className="block mb-2">Product Weight</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("weight", { valueAsNumber: true })}
                      className={`w-full ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                          : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                      } rounded `}
                    />
                    {errors.weight && (
                      <p className="text-[12px] text-red-600">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label>Delivery Method</label>
                    <div className="flex gap-4 pt-1 text-sm">
                      <label className="flex gap-1">
                        <input
                          type="radio"
                          value="company"
                          {...register("delivery", {
                            required: "Please select a delivery method",
                          })}
                        />
                        By Company
                      </label>
                      <label className="flex gap-1">
                        <input
                          type="radio"
                          value="self"
                          {...register("delivery", {
                            required: "Please select a delivery method",
                          })}
                        />
                        Self Pickup
                      </label>
                    </div>
                    {errors.delivery && (
                      <span className="text-[12px] text-red-600">
                        {errors.delivery.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category and Subcategory */}
                <div className="cat-subcat flex justify-between w-[90%]">
                  <div>
                    <label>Category</label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={categoryOptions}
                          onChange={(selected) => {
                            field.onChange(selected);
                            setSelectedCategory(selected);
                          }}
                          value={selectedCategory}
                          placeholder="Select Category"
                          styles={selectStyles}
                        />
                      )}
                    />
                    {errors.category && (
                      <p className="text-[12px] text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label>Subcategory</label>
                    <Controller
                      name="subcategory"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={subcategoryOptions}
                          isDisabled={!selectedCategory}
                          onChange={(selected) => {
                            field.onChange(selected); 
                            setSelectedSubcategory(selected); 
                            setValue("subcategory", selected); 
                          }}
                          value={field.value || selectedSubcategory} 
                          placeholder="Select Subcategory"
                          styles={selectStyles}
                        />
                      )}
                    />
                    {errors.subcategory && (
                      <p className="text-[12px] text-red-600">
                        {errors.subcategory.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Agree to Terms */}
                <div className="mt-2 flex flex-col gap-1">
                  <label htmlFor="agreeToTerms" className="flex gap-1">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      {...register("agreeToTerms")}
                    />
                    <p>
                      I agree to the{" "}
                      <span className="text-blue-500">
                        terms and conditions
                      </span>
                    </p>
                  </label>
                  {errors.agreeToTerms && (
                    <span className="text-[12px] text-red-600">
                      {errors.agreeToTerms.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="part2 w-[45%] h-full">
                {/* Upload Images */}
                <div>
                  <label className="block mb-2">Upload Images (Max 4):</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className={`w-full ${
                      themeMode === "theme-mode-dark"
                        ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                        : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                    } rounded `}
                  />
                  {errors.images && (
                    <p className="text-[12px] text-red-600">
                      {errors.images.message}
                    </p>
                  )}
                </div>

                {/* Image Previews */}
                <div className="flex space-x-2 mb-4">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-600 w-16 h-16 overflow-hidden rounded"
                    >
                      <img
                        src={src}
                        alt={`preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* Has Variants Checkbox */}
                <div>
                  <label className="block mb-2">Has Variants</label>
                  <input
                    type="checkbox"
                    {...register("hasVariant")}
                    className="mr-2"
                  />{" "}
                  Yes
                </div>

                {/* Variants Section */}
                {hasVariantChecked ? (
                  <div>
                    {/* Variant Type */}
                    <div>
                      <label className="block mb-2">Variant Type</label>
                      <input
                        type="text"
                        {...register("variantType", { shouldUnregister: true })}
                        placeholder="e.g. Color or Size"
                        className={`w-full ${
                          themeMode === "theme-mode-dark"
                            ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                            : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                        } rounded `}
                      />
                      {errors.variantType && (
                        <p className="text-[12px] text-red-600">
                          {errors.variantType.message}
                        </p>
                      )}
                    </div>

                    {/* Variants List */}
                    <div className="max-h-[150px] px-2 overflow-y-auto">
                      <label className="block mb-2">Variants</label>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between w-full mb-3"
                        >
                          <input
                            type="text"
                            placeholder="Variant (e.g. Red)"
                            {...register(`variants.${index}.type`, {
                              shouldUnregister: true,
                            })}
                            className={`w-[40%] ${
                              themeMode === "theme-mode-dark"
                                ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                                : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                            } rounded`}
                          />
                          <input
                            type="number"
                            placeholder="Quantity"
                            {...register(`variants.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                            className={`w-[40%] ${
                              themeMode === "theme-mode-dark"
                                ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                                : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                            } rounded`}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                          >
                            <FaRegTrashCan />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append({ type: "", quantity: 0 })}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Add Variant
                      </button>
                    </div>
                  </div>
                ) : (
                  // Total Quantity Section
                  <div>
                    <label className="block mb-2">Total Quantity</label>
                    <input
                      type="number"
                      {...register(
                        "total",
                        { valueAsNumber: true },
                        { shouldUnregister: true }
                      )}
                      className={`w-full ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                          : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                      } rounded `}
                    />
                    {errors.total && (
                      <p className="text-[12px] text-red-600">
                        {errors.total.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="buttoncontainer flex w-full justify-between px-2 mb-4">
              <button
                type="button"
                className={`bg-red-600 p-2 rounded ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"}  font-semibold `}
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`bg-green-600 ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} font-semibold  px-4 py-2 mr-6 rounded`}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default AddProduct;
