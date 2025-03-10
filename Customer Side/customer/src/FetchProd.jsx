import axios from 'axios';


export const fetchProducts = async (endpoint) => {
  try {
    console.log("Base URL:", import.meta.env.VITE_BASE_URL);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      
      headers: {
        'ngrok-skip-browser-warning': '32',
      },
    });
    
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Return null if there's an error
  }
};
