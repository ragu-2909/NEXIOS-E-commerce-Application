import { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "./FetchProd";
import Ad from "./Ad";
import { Header } from "./components/Header";

function LandingPage({ cartItems, setCartItems }) {
  const [productArr, setProductArr] = useState([]);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await fetchProducts("/products");
  //     if (response && response.data?.data) {
  //       setProductArr(response.data.data);
  //     }
  //   };
  //   getProducts();
  // }, []);
  // console.log(productArr);
  const [accdropDown, setdropdownOpen] = useState(false);
  console.log(accdropDown);
  const lengthofcart = Object.keys(cartItems).length;
  console.log(lengthofcart);
  return (
    <div>
      <div className="mt-5 ml-28">
        <Header duration={9000} borderRadius="1.5rem" setdropdownOpen={setdropdownOpen} lenOfCart = {lengthofcart}/>
      </div>

      <div className="flex flex-row justify-normal">
      
        <div>
          <Ad
            cartItems={cartItems}
            setCartItems={setCartItems} />
        </div>



      </div>



    </div>
  )

}
export default LandingPage;