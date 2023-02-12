import React from "react";
const RadioField = ({ options, name, onChange, value, label }) => {
  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value });
  };
  return (
    <div>
      <label>{label}</label>
      <div>
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
      </div>
    </div>
  );
};

export default RadioField;
