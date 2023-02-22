import React from "react";
import PriceButton from "../PriceButton/PriceButton";
import RoomTypeButton from "../RoomTypeButton/RoomTypeButton";
import styles from "./RoomsFiltration.module.scss";

const RoomsFiltration = ({ onFilter }) => {
  return (
    <div className={styles.container}>
      <PriceButton onSubmit={onFilter} />
      <RoomTypeButton onSubmit={onFilter} />
    </div>
  );
};

export default RoomsFiltration;
