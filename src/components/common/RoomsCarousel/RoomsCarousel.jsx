import React, { useRef } from "react";
import { useSelector } from "react-redux";
import RoomItem from "./RoomItem";
import styles from "./RoomsCarousel.module.scss";
import rightChevron from "../../../assets/svg/rightChevron.svg";
import leftChevron from "../../../assets/svg/leftChevron.svg";

const RoomsCarousel = () => {
  const roomTypes = useSelector((state) => state.roomTypes.items);
  const roomsRef = useRef();

  let position = 0;

  const handleMoveLeft = () => {
    const width = roomsRef.current.clientWidth;
    const childNodes = roomsRef.current.childNodes;

    position += width;
    console.log(childNodes);

    if (position > 0) position = -(Math.floor(childNodes.length / 4) * width);

    childNodes.forEach((img) => {
      img.style = `transform: translateX(${position}px)`;
    });
  };

  const handleMoveRight = () => {
    const width = roomsRef.current.clientWidth;
    const childNodes = roomsRef.current.childNodes;

    position -= width;

    if (position < (childNodes.length * -width + width) / 4) position = 0;

    childNodes.forEach((img) => {
      img.style = `transform: translateX(${position}px)`;
    });
  };

  return (
    <div className={styles.carousel}>
      <h2 className={styles.title}>Номера</h2>
      <div className={styles.container}>
        <img src={leftChevron} alt="" onClick={handleMoveLeft} />
        <div className={styles.window}>
          <div className={styles.roomsContainer} ref={roomsRef}>
            {roomTypes.map((item) => (
              <RoomItem key={item._id} {...item} className={styles.item} />
            ))}
          </div>
        </div>
        <img src={rightChevron} alt="" onClick={handleMoveRight} />
      </div>
    </div>
  );
};

export default RoomsCarousel;
