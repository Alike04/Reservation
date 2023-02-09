import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const { email, password, password2 } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match");
    }
    const body = { email: email, password: password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/reservation");
      })
      .catch((e) => {
        setError(e.message);
        console.error(e);
      });
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100">
      <form
        className="bg-white p-10 border-t-8 border-red-500 shadow-md"
        onSubmit={onSubmit}
      >
        <h2 className="text-lg font-medium mb-4">Register</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex space-x-5">
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
          Register
        </button>
        <h1 className="text-red-500">{error}</h1>
      </form>
    </div>
  );
};

export default Register;
