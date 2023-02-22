import React, { useState } from "react";
import { useSelector } from "react-redux";
import RoomsFiltration from "../../components/common/Filter/RoomsFiltration";
import Navbar from "../../components/common/Navbar";
import RoomTypeItem from "../../components/common/RoomTypes/RoomTypeItem";
import styles from "./RoomsPage.module.scss";

const RoomsPage = () => {
  const roomTypes = useSelector((state) => state.roomTypes.items);

  const [filterBy, setFilterBy] = useState({
    price: [0, 1000],
    places: [1, 2],
    rooms: [1, 2, 3],
  });

  const filterData = (data) => {
    setFilterBy((prevState) => ({ ...prevState, ...data }));
  };

  const filteredRooms = roomTypes.filter((r) => {
    const fPrice = filterBy.price[0] <= r.price && filterBy.price[1] >= r.price;
    const fPlaces = filterBy.places.includes(r.places);
    const fRooms = filterBy.rooms.includes(r.rooms);
    return fPlaces && fPrice && fRooms;
  });
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Номера и цены</h2>
          <div>
            <RoomsFiltration onFilter={filterData} />
          </div>
        </div>
        <div className={styles.rooms}>
          {filteredRooms.length ? (
            filteredRooms.map((rType) => (
              <RoomTypeItem key={rType._id} {...rType} />
            ))
          ) : (
            <p>
              Номеров с такими параметрами не найдено. Убедитесь в правильности
              введенных данных.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomsPage;
