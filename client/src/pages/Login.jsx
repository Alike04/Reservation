import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { email: email, password: password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, body, config)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/reservation");
        window.location.reload();
      })
      .catch((e) => {
        setError(e.message);
        console.error(e);
      });
  };

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100">
      <form
        className="bg-white p-10 border-t-8 border-red-500 shadow-md flex justify-center items-center flex-col"
        onSubmit={onSubmit}
      >
        <h2 className="text-lg font-medium mb-4">Login</h2>
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
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
