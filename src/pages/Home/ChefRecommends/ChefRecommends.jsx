import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ChefRecommends = () => {
  const [menu] = useMenu();
  const [cart, refetch] = useCart();
  console.log(cart)
  const salad = menu.filter((item) => item.category === "salad");
  const limitedSalad = salad.slice(0, 3);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();


  const [loadingItemId, setLoadingItemId] = useState(null);

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuId: item._id,
        email: user.email,
        name: item.name,
        image: item.image,
        price: item.price,
      };

      setLoadingItemId(item._id); 

      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          setLoadingItemId(null); // reset loading
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.name} added to your cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        })
        .catch(() => {
          setLoadingItemId(null); // reset loading
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
          });
        });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <SectionTitle subHeading="Should try" heading="CHEF RECOMMENDS" />
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {limitedSalad.map((item) => (
          <div
            key={item._id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="absolute top-4 left-4 z-10 bg-gray-50 bg-opacity-75 text-lg font-bold text-[#ff5200] px-3 py-1 rounded-md">
              ${item.price.toFixed(2)}
            </div>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />

            <div className="relative p-6 pt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {item.name}
              </h3>

              <p className="text-gray-600 text-base mb-4">{item.recipe}</p>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={loadingItemId === item._id}
                className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
                  loadingItemId === item._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ff5200] hover:bg-orange-600"
                }`}
              >
                {loadingItemId === item._id ? (
                  <div className="animate-spin w-5 h-5 border-4 border-t-4 border-yellow-500 rounded-full mx-auto"></div>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommends;
