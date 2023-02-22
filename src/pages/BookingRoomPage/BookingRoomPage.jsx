import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import styles from "./BookingRoomPage.module.scss";
import { getRoomTypeById } from "../../store/slices/roomTypes";
import BlueButton from "../../components/UI/Buttons/BlueButton";
import Carousel from "../../components/UI/PictureCarousel/Carousel";
import { bookNumber, getBooked, unbookNumber } from "../../store/slices/room";
import { getUserId } from "../../services/localStorage.service";
import { getIsLoggedIn } from "../../store/slices/auth";

const BookingRoomPage = () => {
  const navigate = useNavigate();
  const { roomTypeId } = useParams();
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsLoggedIn());

  const roomType = useSelector(getRoomTypeById(roomTypeId));
  const userId = getUserId();
  const booked = useSelector(getBooked(roomType?.name, userId));

  const handleBook = () => {
    if (!isAuth) return navigate("/auth");
    dispatch(bookNumber(roomType.name));
  };
  const handleUnbook = () => {
    dispatch(unbookNumber(booked._id));
  };
  return (
    <>
      <Navbar />
      {roomType?.name && (
        <div className={styles.container}>
          <div className={styles.properties}>
            <div>{roomType.places} - местный</div>
            <div>{roomType.rooms} комнат</div>
          </div>
          <h2>{roomType.name}</h2>
          <div className={styles.main}>
            <div className={styles.photos}>
              <Carousel items={roomType.photos} />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.price}>Цена сутки ${roomType.price}</div>
              <div className={styles.description}>
                {roomType.description.map((cont, i) => (
                  <p key={i}>{cont}</p>
                ))}
              </div>
              {booked ? (
                <>
                  <BlueButton
                    extraStyles={styles.bookedBtn}
                    onClick={handleUnbook}
                  >
                    Забронировано
                  </BlueButton>
                  <p>Ваш номер - {booked.roomNumber}</p>
                </>
              ) : (
                <BlueButton extraStyles={styles.btn} onClick={handleBook}>
                  Забронировать
                </BlueButton>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingRoomPage;
