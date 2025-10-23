

import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result?.user;
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = { name: data.name, email: data.email };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully 🎉",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Mozzo Bazar | Sign Up</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6e3] via-[#f8e9d2] to-[#e6cf9f] px-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#ffb347] to-[#ffcc33] items-center justify-center p-10">
            <div className="text-center text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
                Join Us 👋
              </h1>
              <p className="text-lg opacity-90">
                Create your account and enjoy our delicious food & special deals.
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="signup"
                className="w-40 mx-auto animate-bounce"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Sign Up to Mozzo Bazar
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="flex flex-col text-start gap-2">
                <label className="text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm"
                  required
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">Name is required</span>
                )}
              </div>

              {/* Photo URL */}
              <div className="flex flex-col text-start gap-2">
                <label className="text-sm font-medium text-gray-700">Photo URL*</label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Profile photo URL"
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm"
                  required
                />
                {errors.photoURL && (
                  <span className="text-red-600 text-sm">Photo URL is required</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col text-start gap-2">
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm"
                  required
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">Email is required</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col text-start gap-2">
                <label className="text-sm font-medium text-gray-700">Password*</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Enter your password"
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-sm">Password must be at least 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 text-sm">Password must be less than 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-sm">
                    Must include uppercase, lowercase, number & special character
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-lg font-semibold transition duration-300 bg-[#ff5200] hover:bg-orange-600 text-white"
              >
                Sign Up
              </button>
            </form>

            {/* Already have account */}
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#ff5200] hover:underline"
              >
                Login
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

export default SignUp;

