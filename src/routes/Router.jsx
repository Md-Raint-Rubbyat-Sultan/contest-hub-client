import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PrivetRoute from "./PrivetRoute";
import DashBoard from "../Layouts/DashBoard";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import MyContests from "../pages/DashBoard/MyContests/MyContests";
import AddContest from "../pages/DashBoard/AddContest/AddContest";
import ManageContests from "../pages/DashBoard/ManageContests/ManageContests";
import EditPendingContest from "../pages/DashBoard/EditPendingContest/EditPendingContest";
import Payment from "../pages/Payment/Payment";
import UserProfile from "../pages/DashBoard/UserProfile/UserProfile";
import ParticipateContest from "../pages/DashBoard/participateContest/participateContest";
import WinContest from "../pages/DashBoard/WinContest/WinContest";
import Submission from "../pages/DashBoard/Submission/Submission";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-contests",
        element: <AllContest />,
      },
      {
        path: "contests-details/:id",
        element: (
          <PrivetRoute>
            <ContestDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivetRoute>
            <Payment />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashBoard />
      </PrivetRoute>
    ),
    children: [
      // user routes
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "participate-contest",
        element: <ParticipateContest />,
      },
      {
        path: "win-contest",
        element: <WinContest />,
      },
      // host routes
      {
        path: "my-contest",
        element: <MyContests />,
      },
      {
        path: "add-contest",
        element: <AddContest />,
      },
      {
        path: "edit-contest/:id",
        element: <EditPendingContest />,
      },
      {
        path: "submission/:id",
        element: <Submission />,
      },
      // admin routes
      {
        path: "manage-user",
        element: <AllUsers />,
      },
      {
        path: "manage-contests",
        element: <ManageContests />,
      },
    ],
  },
]);
