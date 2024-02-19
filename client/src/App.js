import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
const router = createBrowserRouter([

  {
    path: "/", element: <ProtectedRoutes><HomePage /></ProtectedRoutes>
  }, {
    path: "/login", element: <PublicRoutes><Login /></PublicRoutes>
  }, {
    path: "/register", element: <PublicRoutes><Register /></PublicRoutes>
  },
  {
    path: "/apply-doctor", element: <ProtectedRoutes><ApplyDoctor /></ProtectedRoutes>
  },
  {
    path: "/allNotification", element: <ProtectedRoutes><NotificationPage /></ProtectedRoutes>
  },
  {
    path: "/admin/doctors", element: <ProtectedRoutes><Doctors /></ProtectedRoutes>
  },
  {
    path: "/admin/users", element: <ProtectedRoutes><Users /></ProtectedRoutes>
  },
  {
    path: "/doctor/profile/:id", element: <ProtectedRoutes><Profile /></ProtectedRoutes>
  },
  {
    path: "/doctor/book-appointment/:doctorId", element: <ProtectedRoutes><BookingPage /></ProtectedRoutes>
  },
  {
    path: "/appointments", element: <ProtectedRoutes><Appointments /></ProtectedRoutes>
  },
  {
    path: "/doctor-appointments", element: <ProtectedRoutes><DoctorAppointments /></ProtectedRoutes>
  },
]
)
function App() {
  const { loading } = useSelector(state => state.alert)
  return (
    <>
      {loading ? <Spinner /> : <RouterProvider router={router} />}

    </>
  );
}

export default App;
