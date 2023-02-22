import React from "react";
import styles from "./Navbar.module.scss";
import navCover from "../../../assets/img/navbar-cover.png";
import { publicNavigation } from "./navButtons";
import { NavLink, useLocation } from "react-router-dom";
import NavButton from "../../UI/Buttons/NavButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoading,
  getIsLoggedIn,
  logOut,
} from "../../../store/slices/auth";
const Navbar = () => {
  const isLogin = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading());
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={styles.navbarAbout}>
      <img src={navCover} alt="" />
      <div className={styles.navigation}>
        <div>
          <NavLink to="/" className={styles.logo}>
            <p className={styles.name}>Wellington</p>
            <p>Hotel</p>
          </NavLink>
          <div className={styles.links}>
            {publicNavigation.map((l) => (
              <NavLink
                key={l.name}
                to={l.to}
                className={l.to === location.pathname && styles.linkActive}
              >
                {l.name}
              </NavLink>
            ))}
            {isLoading ? (
              <NavButton>Loading...</NavButton>
            ) : isLogin ? (
              <NavButton to={"/"} onClick={handleLogout}>
                Выйти
              </NavButton>
            ) : (
              <NavButton
                to={"/auth"}
                active={location.pathname.includes("/auth") && styles.btnActive}
              >
                Войти
              </NavButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
