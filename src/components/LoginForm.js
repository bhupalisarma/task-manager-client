import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "./AuthContext";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setAuthData } = useContext(AuthContext); // Access the setAuthData function from the AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true); // Start loading

        // Send login request to the server
        const response = await axios.post(
          "https://backend-5l4pm4a6m-tusharnath10-gmailcom.vercel.app/api/v1/user/login",
          formData
        );

        // Handle the response based on the status
        if (response.status === 200) {
          // Save the username and userId to the AuthContext
          setAuthData(response.data.id, response.data.username);

          // Redirect to the TodoApp component
          navigate("/todo");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        // Handle request error
        alert("Login failed.Please try again");
        console.log("Login failed", error);
      } finally {
        setLoading(false); // Stop loading
      }

      // Clear the form data
      setFormData({
        username: "",
        password: "",
      });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable the button when loading
        >
          {loading ? <BeatLoader size={8} color="#FFFFFF" /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
