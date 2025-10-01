import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SectionTitle heading="Manage All Items" subHeading="Hurry up" />

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
                <table className="table-auto w-full min-w-max border-collapse">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Item Name</th>
                            <th className="py-3 px-4 text-right">Price</th>
                            <th className="py-3 px-4 text-center">Update</th>
                            <th className="py-3 px-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {menu.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="py-3 px-4 font-medium">{item.name}</td>
                                <td className="py-3 px-4 text-right font-semibold">${item.price}</td>
                                <td className="py-3 px-4 text-center">
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md transition"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
