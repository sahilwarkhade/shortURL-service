import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log("Login error:", err));
  };

  return (
    <div className="h-[92vh] flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Please enter your credentials to sign in
        </p>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
