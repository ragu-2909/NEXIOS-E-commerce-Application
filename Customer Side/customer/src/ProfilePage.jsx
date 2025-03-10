import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { Search, Calendar, Filter, FileText, AlertCircle, ChevronDown, MapPin, Check, Box, Truck } from 'lucide-react';
import OrderProgressTracker from "./OrderProgress";
function Profile({lengthofcart}) {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: "", pincode: "" });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfileFromServer = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Skipping profile fetch.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              token: token,
              "ngrok-skip-browser-warning": "32",
            },
          }
        );
        setProfile(response.data.data);
        setAddresses(response.data.data.address || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileFromServer();
  }, [newAddress]);




  useEffect(() => {
    const fetchOrderhistoryFromServer = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Skipping profile fetch.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/orderHistory`,
          {
            headers: {
              token: token,
              "ngrok-skip-browser-warning": "32",
            },
          }
        );
        setOrderHistory([...response.data.data.orderHistory].reverse());
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchOrderhistoryFromServer();
  }, []);
  console.log(orderHistory)

  const handleAddAddress = async () => {
    if (!newAddress.address || !newAddress.pincode) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Cannot add address.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/addNewAddress`,
        { newadd: newAddress.address, pincode: newAddress.pincode },
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );

      setAddresses([...addresses, response.data.data.address]);
      setNewAddress({ address: "", pincode: "" });
      setShowAddressModal(false);
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  const getStatusColor = (deliveryStatusCode) => {
    switch (deliveryStatusCode) {
      case 0: return 'bg-yellow-600 text-yellow-200';
      case 1: return 'bg-blue-600 text-blue-200';
      case 2: return 'bg-purple-600 text-purple-200';
      case 3: return 'bg-orange-600 text-orange-200';
      case 4: return 'bg-green-600 text-green-200';
      default: return 'bg-gray-600 text-gray-200';
    }
  };

  const getProgressWidth = (statusCode) => {
    return `${(statusCode + 1) * 25}%`;
  };
  console.log(orderHistory)


  return (
    <div
      className="relative flex flex-col  bg-black bg-fixed overflow-y-auto min-h-screen bg-cover bg-center bg-fixed"

    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <div className="relative z-10 px-8">
        <div className="mt-5 ml-28">
          <Header duration={9000} borderRadius="1.5rem" lenOfCart = {lengthofcart} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-10">
          {/* Left Column - Profile and Address */}
          <div className="lg:w-1/4 space-y-6">
            {/* Profile Section */}
            <div className="bg-white/10 border-mars-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff3737,0_0_15px_#ff3737,0_0_30px_#ff3737] p-10 rounded-lg">
              <h1 className="font-bebas font-semibold text-5xl mb-5 bg-gradient-to-br from-[#f157578e] to-[#c2726d] text-transparent bg-clip-text text-center">User Profile</h1>
              <div className="flex flex-col items-center">
                <img
                  src={profile?.image?.[0] || "default-avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 border-red-600"
                />
                <h2 className="text-3xl text-slate-300 font-extrabold mb-6">Hi, {profile?.name || "User"}</h2>
                <div className="text-center w-full">
                  <p className="text-gray-400 text-lg mb-2">Date of Birth: {profile?.dateofbirth || "N/A"}</p>
                  <p className="text-gray-400 text-lg">Phone No: {profile?.phoneNo || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="border-mars-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff3737,0_0_15px_#ff3737,0_0_30px_#ff3737] bg-white/10 p-6 rounded-lg">
              <h2 className="text-5xl font-bebas font-semibold bg-gradient-to-br from-[#f157578e] to-[#c2726d] text-transparent bg-clip-text mb-4 flex items-center justify-between">
                Addresses
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-white bg-gradient-to-br from-[#f15757f7] to-[#ef7e76] rounded-3xl w-14 h-10 items-center hover:bg-blue-600 transition"
                >
                  +
                </button>
              </h2>
              <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-transparent">
                {addresses.map((addr, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#411616] via-gray-900 via-40% to-gray-950 p-4 rounded-lg shadow">
                    <p className="text-white text-lg">
                      {addr.address}, {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order History */}
          <div className="lg:w-3/4">
            <div className="bg-white/10 border-mars-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff3737,0_0_15px_#ff3737,0_0_30px_#ff3737] p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-bebas font-semibold text-5xl bg-gradient-to-br from-[#f157578e] to-[#c2726d] text-transparent bg-clip-text">Order History</h1>
                <div className="flex gap-2">

                </div>
              </div>

              <div className="space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-transparent">
                {orderHistory?.map((order) => (
                  <div key={order.orderId} className="bg-gradient-to-br from-[#120d0d] via-gray-900 via-40% to-gray-950 rounded-lg p-6">
                    <div className="mb-4 border-b border-red-500/20 pb-4">
                      <p className="text-gray-100">Ordered on: {order.orderDateTime}</p>
                      <h1 className="text-xl text-white font-bold text-right">OrderValue=₹{order.orderValue}</h1>
                    </div>


                    <div className="space-y-4">
                      {order.orderItems.map((item) => (
                        <div key={item.LineId} className="flex items-start gap-4 bg-black/30 p-4 rounded-lg">
                          <img src={item.image} alt={item.productName} className="w-24 h-24 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="text-white text-xl font-semibold">{item.productName}</h3>
                            <p className="text-gray-200 text-ls">Quantity: {item.quantity}</p>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.deliveryStatusCode)}`}>
                                {item.deliveryStatus}
                              </span>
                            </div>
                            <OrderProgressTracker statusCode={item.deliveryStatusCode} />

                          </div>
                          <div className="text-right">
                            <p className="text-white text-xl font-semibold">₹{item.totalPrice}</p>
                            {item.deliveryStatusCode!=4 &&<p className="text-gray-400 text-sm">ETA: {item.eta-(0.25*(item.eta)*(item.deliveryStatusCode))} days</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Address</h3>
              <input
                type="text"
                placeholder="Address"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
