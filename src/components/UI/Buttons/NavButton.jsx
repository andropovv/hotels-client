import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavButton.module.scss";

const NavButton = ({ children, to, ...rest }) => {
  return (
    <NavLink className={styles.btn} to={to} {...rest}>
      {children}
    </NavLink>
  );
};

export default NavButton;
