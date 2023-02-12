import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlueButton from "../../components/UI/Buttons/BlueButton";
import Carousel from "../../components/UI/Carousel/Carousel";
import { getRoomTypeById } from "../../store/slices/roomTypes";

const BookingRoomPage = () => {
  const { roomTypeId } = useParams();

  const roomType = useSelector(getRoomTypeById(roomTypeId));
  return (
    <>
      {roomType?.name && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70vw",
              margin: "0 auto",
            }}
          >
            <h1>{roomType.name}</h1>
            <div style={{ width: "100%" }}>
              <Carousel items={roomType.photos} />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ width: "70%" }}>
                {roomType.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div>
                <p>Цена: {roomType.price}</p>
                <BlueButton>Забронировать</BlueButton>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingRoomPage;
