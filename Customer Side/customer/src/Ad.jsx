import { HoverCardContainer, HoverCardBody, HoverCardItem } from "./components/HoverCard"
import AnimatedTestimonials from "./components/AnimatedTestimonials";
import SparklesCore from "./components/Sparkles";
import { PCard, ProdCard } from "./components/ProductCard";
import { Carousel, Card } from "./components/Carousel";
import { fetchProducts } from "./FetchProd";
import { useState, useEffect } from "react";
import axios from "axios";
import { CatCard, CatCarousel } from "./components/CatCarousel";
import { useNavigate } from "react-router-dom";




function Ad({ cartItems, setCartItems }) {
    const [items2, setItems2] = useState([]);
    const [productArr, setProductArr] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vendor, setVendor] = useState([]);
    const[testi , settesti] = useState([]);

    const testimonials = [
        {
            name: " OxyTitan 200T",
            discount: 5,
            price: 12999999,
            description: "Large liquid oxygen tank designed for rocket and space transportation, ensuring robust, reliable supply and maximum performance and safety for heavy industries in demanding environments.",
            src: "https://res.cloudinary.com/dkngwqe98/image/upload/v1729420270/paze6v0cpj7xzgdteynl.jpg",
            id: "6714dbef379eb0119c8c4f7a",
        },
        {
            name: "MethaneTitan 150T",
            discount: 0,
            price: 16249999,
            description: "Large liquid methane tank designed for rocket and space transportation, providing a robust, reliable supply with maximum performance and safety for heavy industries in demanding environments",
            src: "https://res.cloudinary.com/dkngwqe98/image/upload/v1729420489/mkm3ggemrqbs3enlgkps.jpg",
            id: "6714dcc9379eb0119c8c4f89",
        },
        {
            name: "AtmosFlow 100L",
            discount: 5,
            price: 25999,
            description: "High-capacity liquid oxygen cylinder designed for Four-Habitat Complex, ensuring a steady supply for up to 50 days, supporting breathable air and life support needs.",
            src: "https://res.cloudinary.com/dkngwqe98/image/upload/v1729412777/hybjthksf4ddgxm4jzm2.jpg",
            id: "6714beaa8b304981dbda0dcd",
        },
    ];



    // Fetch Products
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchProducts('/products');

                if (!response || !response.data || !response.data.data) {
                    throw new Error("Invalid response structure");
                }

                const productsData = response.data.data;
                setProductArr(productsData);

                // Initialize currentImageIndex
                const initialIndex = productsData.reduce((acc, product) => {
                    acc[product._id] = 0;
                    return acc;
                }, {});
                setCurrentImageIndex(initialIndex);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Could not load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // Fetch Vendor
    useEffect(() => {
        const getVendors = async () => {
            try {
                setLoading(true);
                const response = await fetchProducts('/vendorDetails');

                if (!response || !response.data || !response.data.data) {
                    throw new Error("Invalid response structure");
                }

                const VendorData = response.data.data;
                setVendor(VendorData);


            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Could not load vendors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getVendors();
    }, []);
    console.log(vendor);

    // Update items2 when productArr changes
    useEffect(() => {
        const categories = [...new Set(productArr.map(item => item.category))];
        setItems2(prevItems => [
            ...prevItems,
            ...categories.map(category => ({
                title: ` ${category}`,
            }))
        ]);
    }, [productArr]);

    // Create subcategory mapping
    const subcategoryMap = productArr.reduce((acc, product) => {
        const { subCategory } = product;
        if (!acc[subCategory]) {
            acc[subCategory] = [];
        }
        acc[subCategory].push({
            productId: product._id,
            name: product.name,
            discount: `${product.discount.vendor.disc}%`,
            price: `₹${product.price}`,
            image: product.image[0],
            content: product.description,
        });
        return acc;
    }, {});
    console.log(cartItems);

    // Sort and limit subcategories
    const sortedSubcategories = Object.entries(subcategoryMap)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 6);

    const subcategories = sortedSubcategories.map(([name, products]) => ({
        subcategoryName: name,
        products,
    }));

    // Prepare top-selling items
    const items = productArr
        .filter(item => item.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, 25)
        .map(item => ({
            id: item._id,
            variant: item.quantity.type,
            title: item.name,
            price: `₹${item.price}`,
            discount: `${item.discount.vendor.disc}%`,
            image: item.image[0],
            content: item.description
        }));

    // Safely prepare subcategory items with optional chaining
    const prepareSubcategoryItems = (index) => {
        return subcategories[index]?.products?.map(item => ({
            id: item.productId,
            title: item.name,
            price: `${item.price}`,
            discount: item.discount,
            image: item.image,
            content: item.description
        })) || [];
    };

    const subcat1 = prepareSubcategoryItems(0);
    const subcat2 = prepareSubcategoryItems(1);
    const subcat3 = prepareSubcategoryItems(2);
    const subcat4 = prepareSubcategoryItems(3);
    const subcat5 = prepareSubcategoryItems(4);
    const subcat6 = prepareSubcategoryItems(5);
    const subcat7 = prepareSubcategoryItems(6);
    const subcat8 = prepareSubcategoryItems(7);
    const subcat9 = prepareSubcategoryItems(8);

    const navigate = useNavigate();



    // Render loading state
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-white text-2xl">Loading Products...</div>
        </div>
    );

    // Render error state
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-500 text-2xl">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen p-4 flex flex-col gap-2 items-center space-y-8">
            {/* Rest of your existing JSX remains the same */}
            {/* ... (previous cards and sections) ... */}


            {/* First Row - Two Cards */}
            <div className="flex w-5/6 h-auto mt-5 space-x-4 ml-4 mr-6 ">
                <HoverCardContainer
                    className=" shadow-2xl"
                    containerClassName="flex-1" // Flex-grow for equal width
                    width="w-full"
                    height="h-full"
                >
                    <HoverCardBody>
                        <HoverCardItem
                            className="bg-gradient-to-tl from-[#411616] via-gray-900 via-40% to-gray-950 text-white  flex items-center justify-between rounded-3xl p-8 relative"
                            translateZ={25}
                            onClick={() => navigate("/dis/Electronics and Gadgets")}
                        >
                            {/* Text Content */}
                            <div className="flex flex-col justify-center ml-5 text-left z-10">
                                <h1 className="text-2xl font-bold mb-3 mt-8">Beats Solo</h1>
                                <h2 className="text-6xl font-extrabold mt-2 text-white">Wireless</h2>
                                <h3 className="text-9xl font-extrabold tracking-wide mb-52 text-slate-700 mt-9">
                                    HEADPHONES
                                </h3>
                                <button className="font-bold text-xl bg-blue-900 w-1/4 p-3 rounded-xl cursor-pointer -translate-y-8"
                                    onClick={() => navigate("/dis/Electronics and Gadgets")}
                                >
                                    Shop By Category
                                </button>
                            </div>

                            {/* Image */}
                            <div className="absolute right-0 top-0 flex justify-end h-full">
                                <img
                                    src="https://eshop-tcj.netlify.app/assets/headphone-M8ndZJ0u.png"
                                    alt="Headphones"
                                    className="h-full w-full object-cover p-4 transform translate-x-8 translate-y-8 z-50"
                                />
                            </div>
                        </HoverCardItem>
                    </HoverCardBody>
                </HoverCardContainer>
            </div>

            {/* Second Row - Three Cards */}
            <div className="flex flex-row w-5/6 justify-center space-x-1 gap-4 mr-6">
                {/* Unleash Your Potential Card */}
                <HoverCardContainer
                    className="shadow-lg"
                    containerClassName="flex-[2]"
                    width="w-full"
                    height="h-56"
                >
                    <HoverCardBody>
                        <HoverCardItem
                            className="bg-gradient-to-tl from-[#411616] via-gray-900 via-40% to-gray-950 text-white flex items-center w-full justify-between rounded-3xl p-8 relative"
                            translateZ={45}
                            onClick={() => navigate("/dis/Clothing and Accessories")}
                        >
                            <div className="flex flex-col justify-normal ml-5 text-left z-10">
                                <h2 className="text-4xl font-extrabold  text-white">Unleash Your Potential</h2>
                                <h3 className="text-2xl font-extrabold mt-2 text-gray-600"> Run Fast, Go Far </h3>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-full">
                                <img
                                    src="https://res.cloudinary.com/dkngwqe98/image/upload/v1728669512/ufet5qsedxkzed40jjba.webp"
                                    alt="Shoes"
                                    className="h-[200%] w-full object-cover transform translate-x-28 -translate-y-36 p-12 z-50"
                                />
                            </div>
                        </HoverCardItem>
                    </HoverCardBody>
                </HoverCardContainer>

                {/* Smaller Card */}
                <HoverCardContainer
                    className="shadow-lg"
                    containerClassName="flex-[1]"
                    width="w-full"
                    height="h-56"
                >
                    <HoverCardBody>
                        <HoverCardItem
                            className="bg-gray-950 text-white flex items-center rounded-2xl justify-center"
                            translateZ={25}
                            onClick={() => navigate("/dis/Electronics and Gadgets")}
                        >
                            <img
                                src="src/assets/s24.jpg"
                                alt="Image"
                                className="h-full w-full object-cover rounded-xl transform z-50"
                            />
                        </HoverCardItem>
                    </HoverCardBody>
                </HoverCardContainer>
            </div>


            {/* Spacer for additional separation */}
            <div className="mt-60"></div> {/* Adjust margin as needed */}





            {/* Testimonials Section */}
            <div className="w-full flex justify-center">
                <div className="flex flex-col items-center mt-24">
                    <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
                        Designed for the Martian Frontier
                    </h1>
                    <div className="w-[40rem] h-40 relative">
                        {/* Gradients */}
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                        {/* Core component */}
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={0.5}
                            particleDensity={500}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />

                        {/* Radial Gradient to prevent sharp edges */}

                        <div className="absolute inset-0 w-full h-full bg-transperent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>
                </div>
                <AnimatedTestimonials testimonials={testimonials} autoplay={false} />

            </div>
            <div className="flex flex-col items-center mt-10"> {/* Reduced top margin */}
                <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
                    Top-Selling in Martian Must-Haves!
                </h1>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />


                </div>



            </div>
            <div className=" inset-0 flex items-center justify-center -translate-y-56">
                <ProdCard
                    items={items.map((item, index) => (
                        <PCard key={item.id} card={item} index={item.id} cartItems={cartItems} setCartItems={setCartItems} />
                    ))}
                />
            </div>
            <div className="flex flex-col items-center mt-1 -translate-y-56"> {/* Reduced top margin */}
                <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
                    Shop based on categories
                </h1>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />


                </div>
            </div>
            <div className=" inset-0 flex items-center justify-center -translate-y-96">
                <CatCarousel
                    items2={items2.map((item, index) => (
                        <CatCard key={index} card={item} index={index} />
                    ))}
                />
            </div>

            {/* Subcategory Sections */}
            <div className="flex flex-col items-center mt-1 -translate-y-72">
                {subcategories.slice(0, 8).map((subcategory, index) => (
                    <div key={index} className="w-full">
                        <h1 className="text-5xl  font-bold font-orbitron bg-gradient-to-br from-[#edd5d3] to-[#b08c8a] text-transparent bg-clip-text -translate-y-24">
                            {subcategory.subcategoryName}
                        </h1>
                        <div className="inset-0 flex items-center justify-center -translate-y-36">
                            <ProdCard
                                items={[
                                    subcat1,
                                    subcat2,
                                    subcat3,
                                    subcat4,
                                    subcat5,
                                    subcat6,
                                    subcat7,
                                    subcat8,
                                    subcat9,
                                ][index].map((item, itemIndex) => (
                                    <PCard
                                        key={item.id}
                                        card={item}
                                        index={item.id}
                                        cartItems={cartItems}
                                        setCartItems={setCartItems}
                                    />
                                ))}
                            />
                        </div>
                    </div>
                ))}

            </div>


            <div className="flex flex-col items-center pt-20 -translate-y-96">

               
                <div className="relative mb-24">
                    <h1 className="md:text-7xl text-3xl font-orbitron bg-gradient-to-br from-[#c6b3b2] to-[#c88c89] text-transparent bg-clip-text lg:text-6xl font-bold text-center text-white relative z-20">
                        Shop based on Brand
                    </h1>

                    {/* Gradient Effects */}
                    <div className="w-[40rem] h-40 relative">
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px w-1/4" />
                    </div>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4 max-w-7xl mx-auto -translate-y-52">
                    {vendor.map((item) => (
                        <div
                            key={item.vendorId}
                            onClick={() => navigate(`/cis/${item.vendorId}/${item.vendorName}`)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
                                {/* Hover Effects */}
                                <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg blur" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="aspect-square overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={item.vendorPic}
                                            alt={item.vendorName}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <h2 className="text-white text-center font-semibold text-lg truncate">
                                        {item.vendorName}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ad;