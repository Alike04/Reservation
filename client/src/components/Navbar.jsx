import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const Buttons = () => {
    if (user) {
      return (
        <>
          <button className="nav-btn" onClick={logout}>
            Log out
          </button>
        </>
      );
    }
    return (
      <>
        <NavLink className="nav-btn" to="login">
          Log in
        </NavLink>
        <NavLink className="nav-btn" to="register">
          Register
        </NavLink>
      </>
    );
  };
  return (
    <nav
      className="w-[100%] h-20 bg-red-500 text-white"
      // style={{ borderTopWidth: "12px" }}
    >
      <div className="flex w-[90%] mx-auto justify-around items-center h-[100%]">
        <NavLink to="/">LOGO</NavLink>
        <div className="flex  justify-center">
          <NavLink to="/menu" className="nav-btn">
            Menu
          </NavLink>
          <NavLink className="nav-btn" to="reservation">
            Reservation
          </NavLink>
        </div>
        <div className="flex space-x-10">
          <Buttons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
