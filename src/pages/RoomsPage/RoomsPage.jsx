import React from "react";
import { useSelector } from "react-redux";
import RoomTypeItem from "../../components/common/RoomTypes/RoomTypeItem";

const RoomsPage = () => {
  const roomTypes = useSelector((state) => state.roomTypes.items);
  return (
    <>
      <div>RoomsPage</div>
      {roomTypes.map((rType) => (
        <RoomTypeItem key={rType._id} {...rType} />
      ))}
    </>
  );
};

export default RoomsPage;
