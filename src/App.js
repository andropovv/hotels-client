import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Loader from "./components/UI/Loader/Loader";
import { routesList } from "./routes";
import { getIsRoomsLoading, getRooms } from "./store/slices/room";
import { getIsRoomTypesLoading, getRoomTypes } from "./store/slices/roomTypes";

function App() {
  const routes = useRoutes(routesList);
  const dispatch = useDispatch();
  const isRoomsLoading = useSelector(getIsRoomTypesLoading());
  const isRoomTypesLoading = useSelector(getIsRoomsLoading());

  useEffect(() => {
    dispatch(getRoomTypes());
    dispatch(getRooms());
  }, []);

  if (isRoomTypesLoading || isRoomsLoading) return <Loader />;

  return (
    <div className="App">
      <div className="content">{routes}</div>
      <Footer />
    </div>
  );
}

export default App;
