import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                };

                const menuRes = await axiosSecure.post('/menu', menuItem);

                if (menuRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} added successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Try again."
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionTitle heading="Add an Item" subHeading="What's new?" />

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6"
            >
                {/* Recipe Name */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Recipe Name"
                        {...register('name', { required: true })}
                        className="input input-bordered w-full focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select
                            defaultValue="default"
                            {...register('category', { required: true })}
                            className="select select-bordered w-full focus:ring-2 focus:ring-orange-400"
                        >
                            <option disabled value="default">Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            {...register('price', { required: true })}
                            className="input input-bordered w-full focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>

                {/* Recipe Details */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea
                        {...register('recipe')}
                        placeholder="Describe the recipe..."
                        className="textarea textarea-bordered h-28 w-full focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* Image Upload */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Upload Image*</span>
                    </label>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto flex items-center justify-center gap-2"
                >
                    Add Item <FaUtensils />
                </button>
            </form>
        </div>
    );
};

export default AddItems;
