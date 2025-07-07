import { createBrowserRouter } from "react-router";
import Layout from "../layouts/layout";
import AuthLayout from "../layouts/AuthLayout";
import {
  Home,
  PlayerDetail,
  Profile,
  MyComments,
  AdminMembers,
  AdminPlayers,
  AdminTeams,
  Login,
  NotFoundPage,
  Register,
  TokenTest,
} from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import FootballFieldLoader from "../components/FootballFieldLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "players/:id",
        element: <PlayerDetail />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-comments",
        element: (
          <ProtectedRoute>
            <MyComments />
          </ProtectedRoute>
        ),
      },
      {
        path: "token-test",
        element: (
          <ProtectedRoute requireAdmin>
            <TokenTest />
          </ProtectedRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute requireAdmin>
            <AdminMembers />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/players",
        element: (
          <ProtectedRoute requireAdmin>
            <AdminPlayers />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/teams",
        element: (
          <ProtectedRoute requireAdmin>
            <AdminTeams />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "/loader",
    element: <FootballFieldLoader />,
  },
]);

export default router;
