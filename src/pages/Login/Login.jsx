// import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../providers/AuthProvider';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2'
// import SocialLogin from '../../components/SocialLogin/SocialLogin';

// const Login = () => {
//     const [disabled, setDisabled] = useState(true);
//     const { signIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const from = location.state?.from?.pathname || "/";
//     console.log('state in the location login page', location.state)

//     useEffect(() => {
//         loadCaptchaEnginge(6);
//     }, [])

//     const handleLogin = event => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         console.log(email, password);
//         signIn(email, password)
//             .then(result => {
//                 const user = result.user;
//                 console.log(user);
//                 Swal.fire({
//                     title: 'User Login Successful.',
//                     showClass: {
//                         popup: 'animate__animated animate__fadeInDown'
//                     },
//                     hideClass: {
//                         popup: 'animate__animated animate__fadeOutUp'
//                     }
//                 });
//                 navigate(from, { replace: true });
//             })
//     }

//     const handleValidateCaptcha = (e) => {
//         const user_captcha_value = e.target.value;
//         if (validateCaptcha(user_captcha_value)) {
//             setDisabled(false);
//         }
//         else {
//             setDisabled(true)
//         }
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>Bistro Boss | Login</title>
//             </Helmet>
//             <div className="hero min-h-screen bg-base-200">
//                 <div className="hero-content flex-col md:flex-row-reverse">
//                     <div className="text-center md:w-1/2 lg:text-left">
//                         <h1 className="text-5xl font-bold">Login now!</h1>
//                         <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
//                     </div>
//                     <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
//                         <form onSubmit={handleLogin} className="card-body">
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Email</span>
//                                 </label>
//                                 <input type="email" name="email" placeholder="email" className="input input-bordered" />
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Password</span>
//                                 </label>
//                                 <input type="password" name="password" placeholder="password" className="input input-bordered" />
//                                 <label className="label">
//                                     <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                                 </label>
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <LoadCanvasTemplate />
//                                 </label>
//                                 <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

//                             </div>
//                             <div className="form-control mt-6">
//                                 {/* TODO: apply disabled for re captcha */}
//                                 <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
//                             </div>
//                         </form>
//                         <p className='px-6'><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
//                         <SocialLogin></SocialLogin>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;

import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      const user = result?.user;
      Swal.fire({
        title: "✅ Login Successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
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
                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-sm text-[#ff5200] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Captcha */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Security Check
                </label>
                <div className="flex items-center gap-3">
                  <LoadCanvasTemplate />
                </div>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Enter captcha"
                  className="w-full mt-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff9900] outline-none bg-gray-50"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={disabled}
                className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${
                  disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ff5200] hover:bg-orange-600 text-white"
                }`}
              >
                Login
              </button>
            </form>

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
