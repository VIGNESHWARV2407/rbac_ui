import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const [data, setData] = useState([]);
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Admin") navigate("/login");
  }, [role, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">User's List</h2>
  <div className="overflow-x-auto rounded-lg shadow-lg">
    <table className="w-full text-left border-collapse bg-white">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Mail</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-200 transition`}
          >
            <td className="px-4 py-2 border">{user.name}</td>
            <td className="px-4 py-2 border">{user.mailId}</td>
            <td className="px-4 py-2 border">{user.role}</td>
            <td
              className={`px-4 py-2 border font-semibold ${
                user.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default AdminView;
    