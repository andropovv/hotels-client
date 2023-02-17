import React, { useState } from "react";
import styles from "./SubscribeAbout.module.scss";

const SubscribeInput = () => {
  const [value, setValue] = useState("");

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleClick = () => {
    console.log(value);
    setValue("");
  };
  return (
    <div className={styles.sbsInput}>
      <input
        placeholder="Введите email"
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Подписаться</button>
    </div>
  );
};

export default SubscribeInput;
