import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/create", values)
      .then((res) => {
        console.log(res);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter the Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter the MailID"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter the Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={values.role === "Admin"}
                  className="text-blue-600 focus:ring-blue-500"
                  onChange={(e) =>
                    setValues({ ...values, role: e.target.value })
                  }
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="User"
                  checked={values.role === "User"}
                  className="text-blue-600 focus:ring-blue-500"
                  onChange={(e) =>
                    setValues({ ...values, role: e.target.value })
                  }
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
