import React from "react";
import styles from "./Footer.module.scss";
import FooterSocial from "./FooterSocial";
import FooterTable from "./FooterTable";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.contentBlock}>
        <FooterTable />
        <FooterSocial />
      </div>
    </div>
  );
};

export default Footer;
