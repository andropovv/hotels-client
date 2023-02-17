import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomsCarousel.module.scss";

const RoomItem = ({ name, _id, photos }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/roomTypes/${_id}`);
  };
  return (
    <div className={styles.item} onClick={handleClick}>
      <img src={photos[0]} alt="" />
      <div className={styles.name}>
        <p>
          {name.split(" ")[0]} {name.split(" ")[1]}
        </p>
      </div>
    </div>
  );
};

export default RoomItem;
