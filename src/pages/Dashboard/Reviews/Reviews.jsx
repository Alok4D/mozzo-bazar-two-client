import { useState } from "react";
import toast from "react-hot-toast";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const Reviews = () => {
  const { user } = useAuth(); // user auth থেকে email নেওয়া হচ্ছে
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (index) => setRating(index);
  const handleMouseEnter = (index) => setHoverRating(index);
  const handleMouseLeave = () => setHoverRating(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-12 w-12 cursor-pointer transition-colors duration-300 ${
            (hoverRating || rating) >= i ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-500`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.207-6.0 5.852 1.416 8.289-7.416-3.89-7.416 3.89 1.416-8.289-6.0-5.852 8.332-1.207z" />
        </svg>
      );
    }
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("❌ Please select a rating!");
      return;
    }

    const form = e.target;
    const reviewData = {
      email: user?.email, // auth থেকে email
      rating,
      recipe: form.recipe.value,
      suggestion: form.suggestion.value,
      review: form.review.value,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://mozzo-bazar-two-server.vercel.app/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      if (response.ok) {
        toast.success("✅ Thank you for your review!");
        form.reset();
        setRating(0);
      } else {
        toast.error("❌ Failed to send review. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("⚠️ An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6e3] to-[#d9c6a3] p-6 flex flex-col items-center">
      <div className="w-full">
        <SectionTitle heading="GIVE A REVIEW" subHeading="Sharing is Caring" />
      </div>

      <div className="w-full max-w-3xl rounded-xl bg-white p-10 shadow-lg mt-10">
        <h1 className="mb-10 text-center text-4xl font-semibold tracking-wide text-[#8B653A]">
          RATE US!
        </h1>

        <div className="mb-12 flex justify-center gap-4">{renderStars()}</div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="recipe"
              className="block mb-2 text-lg font-medium text-[#6b5847]"
            >
              Which recipe did you like most?
            </label>
            <input
              type="text"
              id="recipe"
              name="recipe"
              placeholder="Recipe you liked most"
              className="w-full rounded-md border border-[#cfc3ad] bg-[#fefcf9] p-3 text-gray-800 shadow-sm focus:border-[#8B653A] focus:outline-none focus:ring-1 focus:ring-[#8B653A]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="suggestion"
              className="block mb-2 text-lg font-medium text-[#6b5847]"
            >
              Do you have any suggestions for us?
            </label>
            <input
              type="text"
              id="suggestion"
              name="suggestion"
              placeholder="Your suggestion"
              className="w-full rounded-md border border-[#cfc3ad] bg-[#fefcf9] p-3 text-gray-800 shadow-sm focus:border-[#8B653A] focus:outline-none focus:ring-1 focus:ring-[#8B653A]"
            />
          </div>

          <div>
            <label
              htmlFor="review"
              className="block mb-2 text-lg font-medium text-[#6b5847]"
            >
              Kindly express your thoughts in a short way.
            </label>
            <textarea
              id="review"
              name="review"
              placeholder="Write your review here"
              rows="5"
              className="w-full rounded-md border border-[#cfc3ad] bg-[#fefcf9] p-3 text-gray-800 shadow-sm focus:border-[#8B653A] focus:outline-none focus:ring-1 focus:ring-[#8B653A]"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#8B653A] px-10 py-3 text-lg font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#a37b4d]"
            >
              Send Review <span className="text-xl">🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
