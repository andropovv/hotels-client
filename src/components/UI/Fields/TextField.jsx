import React from "react";

const TextField = ({ label, name, onChange, value, error }) => {
  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value });
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TextField;
