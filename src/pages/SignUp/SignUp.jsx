// import { useContext } from "react";
// import { Helmet } from "react-helmet-async";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../../providers/AuthProvider";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2'
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";

// const SignUp = () => {
//     const axiosPublic = useAxiosPublic();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const { createUser, updateUserProfile } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const onSubmit = data => {

//         createUser(data.email, data.password)
//             .then(result => {
//                 const loggedUser = result.user;
//                 console.log(loggedUser);
//                 updateUserProfile(data.name, data.photoURL)
//                     .then(() => {
//                         // create user entry in the database
//                         const userInfo = {
//                             name: data.name,
//                             email: data.email
//                         }
//                         axiosPublic.post('/users', userInfo)
//                             .then(res => {
//                                 if (res.data.insertedId) {
//                                     console.log('user added to the database')
//                                     reset();
//                                     Swal.fire({
//                                         position: 'top-end',
//                                         icon: 'success',
//                                         title: 'User created successfully.',
//                                         showConfirmButton: false,
//                                         timer: 1500
//                                     });
//                                     navigate('/');
//                                 }
//                             })


//                     })
//                     .catch(error => console.log(error))
//             })
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Bistro Boss | Sign Up</title>
//             </Helmet>
//             <div className="hero min-h-screen bg-base-200">
//                 <div className="hero-content flex-col lg:flex-row-reverse">
//                     <div className="text-center lg:text-left">
//                         <h1 className="text-5xl font-bold">Sign up now!</h1>
//                         <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
//                     </div>
//                     <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//                         <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Name</span>
//                                 </label>
//                                 <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
//                                 {errors.name && <span className="text-red-600">Name is required</span>}
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Photo URL</span>
//                                 </label>
//                                 <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
//                                 {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Email</span>
//                                 </label>
//                                 <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
//                                 {errors.email && <span className="text-red-600">Email is required</span>}
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Password</span>
//                                 </label>
//                                 <input type="password"  {...register("password", {
//                                     required: true,
//                                     minLength: 6,
//                                     maxLength: 20,
//                                     pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
//                                 })} placeholder="password" className="input input-bordered" />
//                                 {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
//                                 {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
//                                 {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
//                                 {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
//                                 <label className="label">
//                                     <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                                 </label>
//                             </div>
//                             <div className="form-control mt-6">
//                                 <input className="btn btn-primary" type="submit" value="Sign Up" />
//                             </div>
//                         </form>
//                         <p className="px-6"><small>Already have an account <Link to="/login">Login</Link></small></p>
//                         <SocialLogin></SocialLogin>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SignUp;

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
      // console.log(loggedUser)
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
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
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 px-4">
        <div className="card w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
              Create Your Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">
                    Name is required
                  </span>
                )}
              </div>

              {/* Photo URL */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Profile photo URL"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.photoURL && (
                  <span className="text-red-600 text-sm">
                    Photo URL is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Enter password"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-sm">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-sm">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 text-sm">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-sm">
                    Must have uppercase, lowercase, number, and special
                    character
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="form-control mt-4">
                <input
                  className="btn bg-purple-600 hover:bg-purple-700 text-white rounded-xl w-full"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>

            {/* Already Have Account */}
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-semibold">
                Login
              </Link>
            </p>

            {/* Social Login */}
            <div className="mt-4">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
