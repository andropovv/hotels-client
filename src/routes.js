import { Navigate, Outlet } from "react-router-dom";
import ProtectedRouteForAdmin from "./components/UI/ProtectedRouteForAdmin";
import ProtectedRouteForLoggined from "./components/UI/ProtectedRouteForLoginned";
import AboutPage from "./pages/AboutPage";
import BookingRoomPage from "./pages/BookingRoomPage";
import EditRoomPage from "./pages/EditRoomPage";
import LoginPage from "./pages/LoginPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";

export const routesList = [
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "auth",
    element: <Outlet />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { index: true, element: <Navigate to="./login" /> },
      { path: "*", element: <Navigate to="../login" /> },
    ],
  },
  {
    path: "myBookings",
    element: <ProtectedRouteForLoggined component={MyBookingsPage} />,
  },
  {
    path: "roomTypes",
    element: <Outlet />,
    children: [
      { index: true, element: <RoomsPage /> },
      {
        path: ":roomTypeId",
        element: <Outlet />,
        children: [
          { path: "booking", element: <BookingRoomPage /> },
          {
            path: "edit",
            element: <ProtectedRouteForAdmin component={EditRoomPage} />,
          },
          { index: true, element: <Navigate to="./booking" /> },
          { path: "*", element: <Navigate to="../booking" /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];
