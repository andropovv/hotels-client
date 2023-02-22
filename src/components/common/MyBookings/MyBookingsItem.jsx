import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getRoomTypeByName } from "../../../store/slices/roomTypes";
import styles from "./MyBookingsItem.module.scss";

const MyBookingsItem = ({ room }) => {
  const roomType = useSelector(getRoomTypeByName(room.type));

  return (
    <NavLink to={`/roomTypes/${roomType._id}`} className={styles.container}>
      <div className={styles.image}>
        <img src={roomType.photos[0]} alt="" />
      </div>
      <div className={styles.about}>
        <div className={styles.title}>{roomType.name}</div>
        <div className={styles.properties}>
          <div>{roomType.places} Гостя</div>
          <div>{roomType.rooms} Комнат</div>
          <div>{roomType.square} кв. м</div>
        </div>
        <div className={styles.description}>{roomType.description[0]}</div>
        <div className={styles.price}>
          <div>Цена: ${roomType.price}</div>
          <div>Ваш номер - {room.roomNumber}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default MyBookingsItem;
