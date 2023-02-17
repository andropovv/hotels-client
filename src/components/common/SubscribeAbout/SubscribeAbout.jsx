import React from "react";
import styles from "./SubscribeAbout.module.scss";
import subscribeImg from "../../../assets/img/subscribeAbout.png";
import SubscribeInput from "./SubscribeInput";

const SubscribeAbout = () => {
  return (
    <div className={styles.container}>
      <img src={subscribeImg} alt="" />
      <div className={styles.contentContainer}>
        <div className={styles.title}>Будьте всегда в курсе всех событий</div>
        <div className={styles.text}>
          <p>
            Подпишитесь на рассылку и получайте уведомления о скидках и других
            предложениях
          </p>
        </div>
        <SubscribeInput />
      </div>
    </div>
  );
};

export default SubscribeAbout;
