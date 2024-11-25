import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To display the response message
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((res) => {
        const { role, name } = res.data;
        // Store user data in sessionStorage
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("name", name);

        // Redirect based on role
        if (role === "Super Admin") navigate("/admin");
        else if (role === "Admin") navigate("/admin-view");
        else if (role === "User") navigate(`/welcome/${name}`);
      })
      .catch((err) => {
        if (err.response) {
          // Check the response status and set the appropriate message
          if (err.response.status === 403) {
            setMessage("User is Inactive. Please contact admin.");
          } else if (err.response.status === 404) {
            setMessage("No Records Found");
          } else if (err.response.status === 401) {
            setMessage("Invalid Credentials");
          }
        } else {
          console.error(err);
          setMessage("An unexpected error occurred.");
        }
      });
  };

  return (
    // <div>
    //   <div className="sign_in_form">
    //     <form onSubmit={handleSubmit}>
    //       <h1>Login</h1>
    //       <label>Email</label>
    //       <div>
    //         <input
    //           type="email"
    //           placeholder="Enter your MailID"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <label>Password</label>
    //       <div>
    //         <input
    //           type="password"
    //           placeholder="Enter your Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit">Sign In</button>
    //     </form>
    //     {message && <p>{message}</p>}
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Login
      </h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your MailID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
      >
        Sign In
      </button>
      {message && (
        <p className="text-center text-sm font-medium text-red-600">
          {message}
        </p>
      )}
    </form>
  </div>
</div>

  );
}

export default Login;
