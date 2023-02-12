import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/slices/auth";
import "./Navbar.css";

const Navbar = () => {
  const isAuth = Boolean(localStorage.getItem("access_token"));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">My App</h1>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/roomTypes">Выбрать номер</Link>
        </li>
        <li className="navbar-item">
          <Link to="/">О нас</Link>
        </li>
        {isAuth ? (
          <li className="navbar-item">
            <Link to="/" onClick={handleLogout}>
              Выйти
            </Link>
          </li>
        ) : (
          <li className="navbar-item">
            <Link to="/auth">Вход</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
