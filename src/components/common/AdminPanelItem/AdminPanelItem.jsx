import React from "react";
import styles from "./AdminPanelItem.module.scss";

const AdminPanelItem = ({ bookedBy, roomNumber, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.room}>Комната: {roomNumber}</div>
      <div>{`Тип: ${type}`}</div>
      <div className={styles.status}>
        {bookedBy ? `Забронирован: ${bookedBy}` : "Свободен"}
      </div>
    </div>
  );
};

export default AdminPanelItem;
