import React from "react";
import styles from "./Footer.module.scss";
import tgSvg from "../../../assets/svg/tg.svg";
import vkSvg from "../../../assets/svg/vk.svg";
import { NavLink } from "react-router-dom";

const FooterSocial = () => {
  return (
    <div className={styles.social}>
      <div className={styles.networkImgs}>
        <NavLink to="https://t.me/@Andre7w7">
          <img src={tgSvg} alt="vk" />
        </NavLink>
        <NavLink to="https://vk.com/8andrey8">
          <img src={vkSvg} alt="tg" />
        </NavLink>
      </div>
      <div className={styles.rigths}>
        <p>© 2018 - 2023 HoteLife</p>
        <p>Все права защищены️</p>
      </div>
    </div>
  );
};

export default FooterSocial;
