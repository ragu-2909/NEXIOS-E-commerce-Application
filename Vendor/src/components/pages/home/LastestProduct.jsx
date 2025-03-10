import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoLatestProductComponent from '../../Loaders/NoLatestProductComponent';

const LastestProduct = ({ products }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Reverse and slice the products to get the latest ones
    const reversedProducts = window.innerWidth > 1600 ? [...products].reverse().slice(0, 4) : [...products].reverse().slice(0,3);
    setLatestProducts(reversedProducts);
  }, [products]);

  return (
    <div
      className={`w-full rounded-md h-full flex flex-col p-4 justify-start shadow-lg ${
        themeMode === 'theme-mode-dark' ? 'bg-black text-emerald-400' : 'gradient-bg-light text-gray-800'
      }`}
    >
      <h2
        className={`lg:text-2xl font-semibold lg:mt-2 lg:mb-1 ${
          themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-black'
        }`}
      >
        Latest Products
      </h2>

      {latestProducts.length < 1 ? (
        <div className="w-full h-full flex justify-center items-center">
          <NoLatestProductComponent />
        </div>
      ) : (
        <div className="space-y-4 flex flex-col justify-start"  >
          {latestProducts.map((product, index) => (
            <div
              key={index}
              className={`flex items-center p-2 rounded-md shadow-md ${
                themeMode === 'theme-mode-dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col flex-grow">
                <p
                  className={`text-md font-semibold ${
                    themeMode === 'theme-mode-dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  {product.name}
                </p>
                <p className="text-sm font-medium text-[#26DC5C]">
                ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastestProduct;
