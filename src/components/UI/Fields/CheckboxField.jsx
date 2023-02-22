import React from "react";
import styles from "./CheckboxField.module.scss";

const CheckboxField = ({ name, label, onChange, checked }) => {
  const handleChange = ({ target }) => {
    onChange({
      [target.name]: !checked,
    });
  };
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        name={name}
        id={`check${name}`}
        checked={checked}
        value=""
        onChange={handleChange}
      />
      <label htmlFor={`check${name}`} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
