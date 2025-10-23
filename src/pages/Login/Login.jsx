import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: "✅ Login Successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "❌ Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  // Demo Login
  const handleDemoLogin = (type) => {
    let email = "";
    let password = "";

    if (type === "user") {
      email = "mozzouser@gmail.com";
      password = "@MozzoUser1";
    } else if (type === "admin") {
      email = "mozzoadmin@gmail.com";
      password = "@MozzoAdmin1";
    }

    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: `✅ ${type === "admin" ? "Admin" : "User"} Demo Login Successful!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "❌ Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Mozzo Bazar | Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6e3] via-[#f8e9d2] to-[#e6cf9f] px-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#ffb347] to-[#ffcc33] items-center justify-center p-10">
            <div className="text-center text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
                Welcome Back 👋
              </h1>
              <p className="text-lg opacity-90">
                Login to access your favorite recipes & enjoy delicious food.
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="login"
                className="w-40 mx-auto animate-bounce"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Login to Your Account
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff9900] outline-none bg-gray-50"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff9900] outline-none bg-gray-50"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-lg font-semibold transition duration-300 bg-[#ff5200] hover:bg-orange-600 text-white"
              >
                Login
              </button>
            </form>

            {/* Demo Login Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => handleDemoLogin("user")}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Demo User Login
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Demo Admin Login
              </button>
            </div>

            {/* Signup Link */}
            <p className="mt-6 text-center text-gray-600">
              New Here?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#ff5200] hover:underline"
              >
                Create an Account
              </Link>
            </p>

            {/* Social Login */}
            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
