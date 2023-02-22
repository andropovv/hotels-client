import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavButton.module.scss";

const NavButton = ({ children, active, to, ...rest }) => {
  const style = active ? styles.btn + " " + active : styles.btn;
  return (
    <NavLink to={to} {...rest} className={style}>
      {children}
    </NavLink>
  );
};

export default NavButton;
