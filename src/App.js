import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import NavbarAbout from "./components/common/Navbar/NavbarAbout";
import { routesList } from "./routes";
import { getRoomTypes } from "./store/slices/roomTypes";

function App() {
  const routes = useRoutes(routesList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomTypes());
  }, []);

  return (
    <div className="App">
      <div className="content">{routes}</div>
      <Footer />
    </div>
  );
}

export default App;
