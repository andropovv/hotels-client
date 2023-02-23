import { orderBy } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import AdminPanelItem from "../../components/common/AdminPanelItem/AdminPanelItem";
import Navbar from "../../components/common/Navbar";
import { getAllRooms } from "../../store/slices/room";
import styles from "./AdminPanel.module.scss";

const AdminPanel = () => {
  const rooms = useSelector(getAllRooms());

  const sortedRooms = orderBy(rooms, ["roomNumber"], ["asc"]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.header}>Статус номеров</h2>
        <div className={styles.roomsList}>
          {sortedRooms.map((r) => (
            <AdminPanelItem key={r._id} {...r} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
