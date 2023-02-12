import React, { useState } from "react";
import PhotoModal from "../PhotoModal";
import styles from "./Carousel.module.scss";

const CarouselItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <img
        src={item}
        alt=""
        className={styles.item}
        onClick={handleModalOpen}
      />
      {isModalOpen && <PhotoModal photoUrl={item} onClose={handleModalClose} />}
    </>
  );
};

export default CarouselItem;
