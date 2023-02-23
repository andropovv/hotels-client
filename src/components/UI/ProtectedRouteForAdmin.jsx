import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getIsLoading,
  getIsLoggedIn,
  getMe,
  getUser,
} from "../../store/slices/auth";
import Loader from "./Loader/Loader";

const ProtectedRouteForAdmin = ({ component: Component }) => {
  const isLoginned = useSelector(getIsLoggedIn());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  const isLoading = useSelector(getIsLoading());

  const user = useSelector(getUser());
  if (!isLoginned) return <Navigate to="/" />;
  if (isLoading || !user) return <Loader />;
  return <>{user?.admin ? <Component /> : <Navigate to="/" />}</>;
};

export default ProtectedRouteForAdmin;
