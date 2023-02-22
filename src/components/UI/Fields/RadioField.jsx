import React from "react";
import styles from "./RadioField.module.scss";

const RadioField = ({ options, name, onChange, value, label, error }) => {
  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value });
  };
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.items}>
        {options.map((option) => (
          <div key={option.name + "_" + option.value}>
            <input
              type="radio"
              name={name}
              id={option.name + "_" + option.value}
              checked={option.value === value}
              value={option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.name + "_" + option.value}>
              {option.name}
            </label>
          </div>
        ))}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default RadioField;
