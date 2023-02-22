import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoading, getMe, getUser } from "../../store/slices/auth";
import Loader from "./Loader/Loader";

const ProtectedRouteForAdmin = ({ component: Component }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  const isLoading = useSelector(getIsLoading());

  const user = useSelector(getUser());
  if (isLoading || !user) return <Loader />;
  return <>{user?.admin ? <Component /> : <Navigate to="../booking" />}</>;
};

export default ProtectedRouteForAdmin;
