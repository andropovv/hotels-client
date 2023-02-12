import React from "react";
import styles from "./CloseButton.module.scss";

const CloseButton = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <span className={styles.closeIcon}>&times;</span>
    </button>
  );
};

export default CloseButton;
