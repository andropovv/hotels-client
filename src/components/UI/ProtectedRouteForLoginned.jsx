import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "../../store/slices/auth";

const ProtectedRouteForLoggined = ({ component: Component }) => {
  const isLoginned = useSelector(getIsLoggedIn());
  return <>{isLoginned ? <Component /> : <Navigate to="/auth" />}</>;
};

export default ProtectedRouteForLoggined;
