import React, { useEffect, useRef, useState } from "react";
import styles from "./PriceButton.module.scss";
import stickSvg from "../../../assets/svg/stick.svg";

const PriceButton = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const btnStyles = open ? styles.btn + " " + styles.btnActive : styles.btn;
  const dropDownStyles = open
    ? styles.dropDownActive + " " + styles.dropDown
    : styles.dropDown;

  const [price, setPrice] = useState([0, 1000]);

  const rootEl = useRef();

  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setOpen(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleChange = ({ target }) => {
    if (target.name === "min") {
      setPrice((prevState) => [Number(target.value), prevState[1]]);
    }
    if (target.name === "max") {
      setPrice((prevState) => [prevState[0], Number(target.value)]);
      console.log(typeof price[1]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ price });
    setOpen(false);
  };

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className={styles.container} ref={rootEl}>
      <button className={btnStyles} onClick={handleClick}>
        Цена
      </button>
      <div className={dropDownStyles}>
        <p>Цена за сутки, $</p>
        <div>
          <input
            type="number"
            className={styles.inp}
            value={price[0]}
            name="min"
            onChange={handleChange}
          />
          <img src={stickSvg} alt="" />
          <input
            type="number"
            className={styles.inp}
            value={price[1]}
            name="max"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className={styles.submitBtn}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default PriceButton;
