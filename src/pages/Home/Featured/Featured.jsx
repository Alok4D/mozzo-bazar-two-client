import { Link } from "react-router-dom";

import featuredImage from "../../../assets/home/featured.jpg";
import "./Featured.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Featured = () => {
  return (
    <section className="featured-item bg-fixed text-white py-10 relative px-2 md:px-4 lg:px-0">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10">
        <SectionTitle
          heading="Featured Items"
          subHeading="Check it out"
        ></SectionTitle>

        {/* Main container */}
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-12">
          {/* Left - Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={featuredImage}
              alt="Featured Food"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right - Content */}
          <div className="text-white space-y-4">
            <p className="text-sm md:text-base text-yellow-400 font-medium">
              Aug 20, 2029
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
              Where Can I Get Some?
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              For fresh meals like Salads, Soups, or Sandwiches, local cafes and
              healthy food restaurants are great options. For Pizza or Burgers,
              you can check out popular chains or local pizzerias. Desserts like
              are usually available at bakeries, dessert shops, or even some
              coffee shops.
            </p>

            {/* Button */}
            <Link to="/order/salad">
              <button className="px-10 py-3 mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
