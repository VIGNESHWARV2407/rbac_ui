import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    newName: "",
    mailId: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/${name}`)
      .then((res) => {
        const user = res.data[0];
        setValues({
          newName: user.name,
          mailId: user.mailId,
          password: user.password,
          role: user.role,
        });
      })
      .catch((err) => console.error(err));
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/edit/${name}`, values)
      .then((res) => {
        console.log(res);
        navigate("/admin"); // Redirect to main page
      })
      .catch((err) => console.error(err));
  };

  return (
    // <div>
    //   <h2>Update User</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //     <label>Name</label>
    //     <input
    //       type="text"
    //       value={values.newName}
    //       onChange={(e) => setValues({ ...values, newName: e.target.value })}
    //     />
    //     </div>
    //     <div>
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       value={values.mailId}
    //       onChange={(e) => setValues({ ...values, mailId: e.target.value })}
    //     />
    //     </div>
    //     <div>
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       value={values.password}
    //       onChange={(e) => setValues({ ...values, password: e.target.value })}
    //     />
    //     </div>
    //     <div>
    //     <label>Role</label>
    //     <div>
    //       <input
    //         type="radio"
    //         name="role"
    //         value="Admin"
    //         checked={values.role === "Admin"}
    //         onChange={(e) => setValues({ ...values, role: e.target.value })}
    //       />
    //       Admin
    //       <input
    //         type="radio"
    //         name="role"
    //         value="User"
    //         checked={values.role === "User"}
    //         onChange={(e) => setValues({ ...values, role: e.target.value })}
    //       />
    //       User
    //     </div>
    //     <div>
    //     <button type="submit">Update</button>

    //     </div>
    //     </div>
    //   </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Update User
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.newName}
          onChange={(e) => setValues({ ...values, newName: e.target.value })}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Enter Name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.mailId}
          onChange={(e) => setValues({ ...values, mailId: e.target.value })}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Enter Email"
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Enter Password"
        />
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={values.role === "Admin"}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Admin</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="User"
              checked={values.role === "User"}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">User</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Update;

