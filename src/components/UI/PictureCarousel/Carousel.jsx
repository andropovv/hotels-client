import React, { useRef } from "react";
import styles from "./Carousel.module.scss";
import CarouselItem from "./CarouselItem";
import rigthChevron from "../../../assets/svg/rightChevron.svg";
import leftChevron from "../../../assets/svg/leftChevron.svg";

const Carousel = ({ items }) => {
  const imagesRef = useRef();

  let position = 0;

  const handleMoveLeft = () => {
    const width = imagesRef.current.clientWidth;
    const childNodes = imagesRef.current.childNodes;

    position += width;

    if (position > 0) position = -childNodes.length * width + width;

    childNodes.forEach((img) => {
      img.style = `transform: translateX(${position}px)`;
    });
  };

  const handleMoveRight = () => {
    const width = imagesRef.current.clientWidth;
    const childNodes = imagesRef.current.childNodes;

    position -= width;

    if (position < childNodes.length * -width + width) position = 0;

    childNodes.forEach((img) => {
      img.style = `transform: translateX(${position}px)`;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.imagesContainer} ref={imagesRef}>
          {items.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </div>
      </div>
      <img
        src={leftChevron}
        alt=""
        onClick={handleMoveLeft}
        className={styles.moveLeft}
      />
      <img
        src={rigthChevron}
        alt=""
        onClick={handleMoveRight}
        className={styles.moveRight}
      />
    </div>
  );
};

export default Carousel;
