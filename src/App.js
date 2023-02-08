import { useRoutes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { routesList } from "./routes";

function App() {
  const routes = useRoutes(routesList);

  return (
    <>
      <Navbar />
      {routes}
      <Footer />
    </>
  );
}

export default App;
