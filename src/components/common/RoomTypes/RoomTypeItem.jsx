import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./RoomTypeItem.module.scss";

const RoomTypeItem = ({
  name,
  description,
  photos,
  price,
  _id,
  rooms,
  places,
  square,
}) => {
  return (
    <NavLink to={_id} className={styles.container}>
      <div className={styles.image}>
        <img src={photos[0]} alt="" />
      </div>
      <div className={styles.about}>
        <div className={styles.title}>{name}</div>
        <div className={styles.properties}>
          <div>{places} Гостя</div>
          <div>{rooms} Комнат</div>
          <div>{square} кв. м</div>
        </div>
        <div className={styles.description}>{description[0]}</div>
        <div className={styles.price}>Цена: ${price}</div>
      </div>
    </NavLink>
  );
};

export default RoomTypeItem;
