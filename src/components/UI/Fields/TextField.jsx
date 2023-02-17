import React from "react";
import styles from "./TextField.module.scss";

const TextField = ({
  label,
  name,
  onChange,
  value,
  error,
  placeholder = "Enter here",
}) => {
  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value });
  };

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}

      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TextField;
