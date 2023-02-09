import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Menu from "./pages/Menu";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setUser(res.data.user);
        setIsLoaded(true);
      })
      .catch((e) => {
        localStorage.removeItem("token");
        setIsLoaded(true);
      });
  }, []);
  if (!isLoaded) return <div></div>;
  return (
    <>
      <BrowserRouter>
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Booking user={user} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
