import React, { useEffect, useRef, useState } from "react";
import CheckBoxField from "../CheckBoxField/CheckBoxField";
import styles from "./RoomTypeButton.module.scss";

const RoomTypeButton = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [boxes, setBoxes] = useState([
    { label: "1 - местный", name: "places", value: 1, checked: true },
    { label: "2 - местный", name: "places", value: 2, checked: true },
    { label: "1 комната", name: "rooms", value: 1, checked: true },
    { label: "2 комнаты", name: "rooms", value: 2, checked: true },
    { label: "3 комнаты", name: "rooms", value: 3, checked: true },
  ]);

  const btnStyles = open ? styles.btn + " " + styles.btnActive : styles.btn;
  const dropDownStyles = open
    ? styles.dropDownActive + " " + styles.dropDown
    : styles.dropDown;

  const rootEl = useRef();

  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setOpen(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleChange = (data) => {
    setBoxes((prevState) =>
      prevState.map((b) => (b.label === data.label ? data : b))
    );
  };

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSubmit = () => {
    onSubmit({
      rooms: boxes
        .filter((b) => b.name === "rooms" && b.checked)
        .map((b) => b.value),
      places: boxes
        .filter((b) => b.name === "places" && b.checked)
        .map((b) => b.value),
    });
    setOpen(false);
  };

  return (
    <div className={styles.container} ref={rootEl}>
      <button className={btnStyles} onClick={handleClick}>
        Тип размещения
      </button>
      <div className={dropDownStyles}>
        {boxes.map((b) => (
          <CheckBoxField
            key={b.label}
            label={b.label}
            name={b.name}
            value={b.value}
            checked={b.checked}
            onChange={handleChange}
          />
        ))}
        <button onClick={handleSubmit} className={styles.submitBtn}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default RoomTypeButton;
