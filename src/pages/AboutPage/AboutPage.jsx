import React from "react";
import AboutAdvantages from "../../components/common/AboutAdvantages";
import NavbarAbout from "../../components/common/Navbar/NavbarAbout";
import RoomsCarousel from "../../components/common/RoomsCarousel";
import SubscribeAbout from "../../components/common/SubscribeAbout/SubscribeAbout";
import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <NavbarAbout />
      <RoomsCarousel />
      <AboutAdvantages />
      <SubscribeAbout />
    </div>
  );
};

export default AboutPage;
