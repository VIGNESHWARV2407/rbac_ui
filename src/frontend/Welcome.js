import React from "react";
import { useParams } from "react-router-dom";

function Welcome() {
  const { username } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome, <span className="capitalize">{username}</span>!
        </h1>
        <p className="text-lg font-medium">
          We're glad to have you here. Explore your dashboard and enjoy your journey!
        </p>
      </div>
    </div>
  );
}

export default Welcome;
