import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteForLoggined = ({ component: Component }) => {
  const isLoginned = true;
  return <>{isLoginned ? <Component /> : <Navigate to="/" />}</>;
};

export default ProtectedRouteForLoggined;
