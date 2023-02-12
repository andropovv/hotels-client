import React from "react";
import { NavLink } from "react-router-dom";

const RoomTypeItem = ({ name, description, photos, price, _id }) => {
  return (
    <div
      style={{
        width: "80vw",
        backgroundColor: "aliceblue",
        display: "flex",
        marginBottom: "6px",
      }}
    >
      <div style={{ width: "200px", height: "200px" }}>
        <img
          src={photos[0]}
          alt=""
          style={{ width: "200px", height: "200px", overflow: "hidden" }}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "6px" }}>{name}</h3>
        <p>{description[0].split(".")[0] + "..."}</p>
        <p style={{ marginTop: "10px" }}>Цена: ${price}</p>
        <NavLink to={`${_id}`}>Подробнее...</NavLink>
      </div>
    </div>
  );
};

export default RoomTypeItem;
