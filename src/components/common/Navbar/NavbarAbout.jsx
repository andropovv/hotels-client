import React from "react";
import styles from "./NavbarAbout.module.scss";
import navCover from "../../../assets/img/navbar-cover.png";
import { publicNavigation } from "./navButtons";
import { NavLink } from "react-router-dom";
import NavButton from "../../UI/Buttons/NavButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoading,
  getIsLoggedIn,
  logOut,
} from "../../../store/slices/auth";

const NavbarAbout = () => {
  const isLogin = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading());

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
              <NavLink key={l.name} to={l.to}>
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
              <NavButton to={"/auth"}>Войти</NavButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAbout;
