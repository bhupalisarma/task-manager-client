import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "./AuthContext";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { setAuthData } = useContext(AuthContext); // Access the setAuthData function from the AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Send the form data to the server
        const response = await axios.post(
          "https:/task-manager-client-mu.vercel.app/api/v1/user/signup",
          {
            username: formData.username,
            password: formData.password,
          }
        );

        // Clear the form data
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});

        // Save the username and userId to the AuthContext
        setAuthData(response.data.id, response.data.username);
      } catch (error) {
        console.error("Registration failed:", error);
        // Handle the error appropriately (e.g., show error message)
      }
    } else {
      setErrors(errors);
    }
    setLoading(false);
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.username ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <BeatLoader size={8} color="white" loading={loading} /> // Show the loader
          ) : (
            "Register" // Show the "Register" text
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
