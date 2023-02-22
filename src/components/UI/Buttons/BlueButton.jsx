import React from "react";
import styles from "./BlueButton.module.css";

const BlueButton = ({ children, extraStyles = null, ...rest }) => {
  const btnStyles = extraStyles
    ? styles.blueButton + " " + extraStyles
    : styles.blueButton;
  return (
    <button type="button" className={btnStyles} {...rest}>
      {children}
    </button>
  );
};

export default BlueButton;
