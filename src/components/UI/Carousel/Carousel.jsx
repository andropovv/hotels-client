import React, { useRef } from "react";
import styles from "./Carousel.module.scss";
import CarouselItem from "./CarouselItem";

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
      <button onClick={handleMoveLeft}>лево</button>
      <div className={styles.window}>
        <div className={styles.imagesContainer} ref={imagesRef}>
          {items.map((item, i) => (
            <CarouselItem item={item} />
          ))}
        </div>
      </div>
      <button onClick={handleMoveRight}>право</button>
    </div>
  );
};

export default Carousel;
