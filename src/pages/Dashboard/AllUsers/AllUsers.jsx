import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">👥 Manage All Users</h2>
        <span className="text-lg font-semibold bg-blue-100 px-4 py-2 rounded-lg">
          Total: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gradient-to-r from-orange-400 to-red-500 text-black">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-orange-50 transition duration-200"
              >
                <td className="font-medium">{index + 1}</td>
                <td className="font-semibold">{user.name}</td>
                <td className="text-gray-600">{user.email}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-medium">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                    >
                      <FaUsers className="mr-1" /> Make Admin
                    </button>
                  )}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-red-100 hover:bg-red-200 rounded-full"
                  >
                    <FaTrashAlt className="text-red-600 text-lg" />
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

export default AllUsers;
