import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin() {

  const handleDelete = (name) => {
    axios
      .delete(`http://localhost:8081/delete/${name}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState([]);
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Super Admin") navigate("/login");
  }, [role, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStatusChange = (name, newStatus) => {
    axios
      .put(`http://localhost:8081/update-status/${name}`, { status: newStatus })
      .then((res) => {
        console.log(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
  <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      User's List
    </h2>
    <div className="flex justify-end mb-4">
      <Link
        to="/create"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Create +
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
              Name
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
              Mail
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
              Role
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
              Status
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                {user.name}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                {user.mailId}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                {user.role}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                {user.status}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                <div className="flex space-x-2">
                  <Link
                    to={`/read/${user.name}`}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/edit/${user.name}`}
                    className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.name)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        user.name,
                        user.status === "Active" ? "Inactive" : "Active"
                      )
                    }
                    className={`${
                      user.status === "Active"
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-3 py-1 rounded-lg transition duration-200`}
                  >
                    {user.status === "Active" ? "Inactive" : "Active"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default Admin;
