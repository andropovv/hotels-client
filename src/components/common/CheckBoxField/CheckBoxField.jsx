import React from "react";
import styles from "./CheckBox.module.scss";

const CheckBoxField = ({ name, label, value, onChange, checked }) => {
  const handleChange = ({ target }) => {
    onChange({
      name: target.name,
      checked: !checked,
      value,
      label,
    });
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.inp}
        type="checkbox"
        value=""
        id={`check${name}`}
        checked={checked}
        name={name}
        onChange={handleChange}
      />
      <label htmlFor={`check${name}`} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
