import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:8000/reviews");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load reviews</p>;

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 mb-8">
      <div className="container mx-auto sm:px-2 md:px-2 lg:px-0">
        <SectionTitle subHeading="What Our Clients Say" heading="Testimonials" />

        <Swiper
          navigation={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="mySwiper mt-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex justify-center items-center px-4 py-8">
                <div className="bg-white shadow-lg hover:shadow-2xl transition duration-300 ease-in-out rounded-xl p-8 md:p-10 container mx-auto w-full border-t-4 border-yellow-400">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={review.rating}
                      readOnly
                    />
                  </div>

                  {/* Recipe */}
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-2">
                    {review.recipe}
                  </h4>

                  {/* Review */}
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center mb-3">
                    "{review.review}"
                  </p>

                  {/* Suggestion */}
                  <p className="text-gray-500 text-sm text-center italic">
                    Suggestion: {review.suggestion}
                  </p>

                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto my-6 rounded-full"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
