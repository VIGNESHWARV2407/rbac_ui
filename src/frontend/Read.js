import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const { name } = useParams(); 
  const [read, setRead] = useState({}); 

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/${name}`) 
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setRead(res.data[0]); 
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [name]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
      User Details
    </h1>
    {read ? (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">
          <span className="font-bold">Name:</span> {read.name}
        </h3>
        <h3 className="text-lg font-medium text-gray-700">
          <span className="font-bold">Email:</span> {read.mailId}
        </h3>
        <h3 className="text-lg font-medium text-gray-700">
          <span className="font-bold">Role:</span> {read.role}
        </h3>
      </div>
    ) : (
      <p className="text-center text-red-500 font-semibold mt-4">
        No user found
      </p>
    )}
    <div className="mt-6 flex justify-between">
      <Link
        to="/admin"
        className="text-blue-500 font-medium hover:text-blue-600 transition duration-200"
      >
        Back
      </Link>
      <Link
        to={`/edit/${read.name}`}
        className="text-blue-500 font-medium hover:text-blue-600 transition duration-200"
      >
        Edit
      </Link>
    </div>
  </div>
</div>

  );
}

export default Read;
