import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteForAdmin = ({ component: Component }) => {
  const isAdmin = true;
  return <>{isAdmin ? <Component /> : <Navigate to="../booking" />}</>;
};

export default ProtectedRouteForAdmin;
