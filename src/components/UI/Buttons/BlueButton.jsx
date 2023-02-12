import React from "react";
import styles from "./BlueButton.module.css";

const BlueButton = ({ children, ...rest }) => {
  return (
    <button type="button" className={styles.blueButton} {...rest}>
      {children}
    </button>
  );
};

export default BlueButton;
