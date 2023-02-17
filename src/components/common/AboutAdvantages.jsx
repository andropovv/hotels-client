import React from "react";
import styles from "./AboutAdvantages.module.scss";
import sheld from "../../assets/svg/advantagesAbout/sheld.svg";
import star from "../../assets/svg/advantagesAbout/star.svg";
import mapPin from "../../assets/svg/advantagesAbout/map-pin.svg";
import discount from "../../assets/svg/advantagesAbout/discount.svg";

const items = [
  { caption: "Гарантия качества", img: sheld },
  { caption: "Более 5 лет успешной работы", img: star },
  { caption: "Удобное местоположение", img: mapPin },
  { caption: "Комфортные цены без комиссий", img: discount },
];

const AboutAdvantages = () => {
  return (
    <div className={styles.advantages}>
      <h2 className={styles.title}>Преимущества Wellington</h2>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <div key={item.caption} className={styles.item}>
            <img src={item.img} alt="" />
            <div>
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutAdvantages;
