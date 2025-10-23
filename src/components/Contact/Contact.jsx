import { useState } from "react";
import Cover from "../../pages/Shared/Cover/Cover";
import telephone from "../../../src/assets/home/tele-removebg-preview.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/contacts", formData);
      if (res.data.success) {
        toast.success("✅ Your message has been sent successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("❌ Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Cover
        img="https://blog.swiggy.com/wp-content/uploads/2024/04/Rice-1024x538.jpg"
        title="Contact"
      />

      <div className="bg-gradient-to-b from-[#fff1f2] via-[#fff9f2] to-white py-20 px-6">
        <div className="container mx-auto text-center">
          <img src={telephone} alt="Old phone" className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff5200] mb-4 tracking-tight">
            HELLO
          </h1>
          <p className="text-base md:text-lg text-gray-700 sm:w-auto md:w-auto lg:w-[70%] mx-auto mb-12 leading-relaxed">
            You&apos;ve got some questions and we&apos;ve got answers. Ask us
            about an order, a product, or anything we can help with!
          </p>

          {/* Contact Section */}
          <section className="flex flex-col md:flex-row items-stretch justify-between bg-white shadow-2xl rounded-3xl overflow-hidden min-h-[500px]">
            {/* Left Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-[#ffecd5] via-white to-[#ffe0b3] p-10 md:p-14 flex flex-col justify-center">
              <p className="text-[#ff5200] font-semibold uppercase tracking-widest">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-snug">
                Have a question or feedback?
              </h2>
            </div>

            {/* Right Section - Form */}
            <div className="md:w-1/2 p-10 md:p-14 bg-white flex flex-col justify-center">
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                {["name", "email", "phone", "subject"].map((field) => (
                  <div key={field} className="flex flex-col text-start gap-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {field}{" "}
                      {["name", "email", "subject"].includes(field) && "*"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm transition duration-300 hover:border-[#ff5200]"
                      required={["name", "email", "subject"].includes(field)}
                    />
                  </div>
                ))}

                <div className="flex flex-col text-start gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5200] shadow-sm transition duration-300 hover:border-[#ff5200]"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#ff5200] hover:bg-[#e04a00] text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
