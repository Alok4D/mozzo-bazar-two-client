import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { HiOutlineShoppingCart } from "react-icons/hi";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } ${x + width / 2}, ${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height} Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews
  const { data: allReviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const userReviewCount = allReviews.filter((r) => r.email === user?.email).length;

  // Fetch Cart Items
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch Orders / Payments
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalMenuItems = orders.reduce((acc, order) => {
  return acc + (order.menuItemIds?.length || 0);
}, 0);

  // Chart Data
  const chartData = cartItems.map((item) => ({
    name: item.name,
    uv: item.price,
  }));

  return (
    <div className="p-4 space-y-6">
    {/* // Inside your component */}
<div className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-2 border-gray-200">
  {/* Left Side: User Info */}
  <div className="flex items-center gap-4">
    <div className="relative">
      <img
        src={user?.photoURL || "/default-profile.png"}
        alt="Profile"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover animate-pulse-scale border-4 border-blue-400"
      />
      <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 border-2 border-white rounded-full"></div>
    </div>
    <div className="text-center sm:text-left">
      <h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800">
        {user?.displayName || "Back"}
      </h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Email:</span> {user?.email}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Role:</span> {user?.role || "user"}
      </p>
      <p className="text-gray-600">Your review : {userReviewCount}</p>
    </div>
  </div>

{/* Right Side: Total Menu Items Bought */}
<div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 flex items-center gap-4 min-w-[300px] sm:min-w-[420px] border border-blue-200">
  {/* Icon */}
  <div className="bg-blue-100 text-blue-500 rounded-full p-3 sm:p-4 flex items-center justify-center">
    <HiOutlineShoppingCart className="text-2xl sm:text-3xl" />
  </div>

  {/* Text */}
  <div className="flex flex-col">
    <p className="text-gray-600 text-sm sm:text-base font-medium">Total Menu Items Bought</p>
    <h2 className="text-xl sm:text-2xl font-bold text-blue-800">{totalMenuItems}</h2>
  </div>
</div>
</div>

      {/* Cart Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="uv" shape={<TriangleBar />} label={{ position: "top" }}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-6 border-b pb-2">Your Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-l-4 border-blue-400 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-400 text-white font-bold flex items-center justify-center rounded-full text-lg">
                  #{idx + 1}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between w-full text-gray-800">
                  <div className="font-semibold">Total: ${order.price}</div>
                  <div className="text-gray-500 mt-1 sm:mt-0">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inline CSS for pulse-scale animation */}
      <style>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default UserHome;
