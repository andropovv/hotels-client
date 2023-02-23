import React from "react";
import { useSelector } from "react-redux";
import MyBookingsItem from "../../components/common/MyBookings/MyBookingsItem";
import Navbar from "../../components/common/Navbar";
import Profile from "../../components/Profile/Profile";
import { getUserId } from "../../services/localStorage.service";
import { getRoomsByUserId } from "../../store/slices/room";
import styles from "./MyBooking.module.scss";

const MyBookingsPage = () => {
  const userId = getUserId();
  const rooms = useSelector(getRoomsByUserId(userId));

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <Profile />
        <div className={styles.header}>
          <h2>Мои номера</h2>
        </div>
        <div className={styles.rooms}>
          {rooms.length ? (
            rooms.map((room) => <MyBookingsItem key={room._id} room={room} />)
          ) : (
            <p>Вы еще не забронировали номер</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
