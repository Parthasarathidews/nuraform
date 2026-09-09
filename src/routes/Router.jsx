import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Dashboard from "../pages/dashboard/Dashboard";
import DemoLandingPage from "../pages/demo/DemoLandingPage";
import Login from "../pages/login/Login";
import CreateAccountLandingPage from "../pages/account-creation/CreateAccountLandingPage";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import PrevFormLandingPage from "../pages/prevForm/PrevFormLandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/pricing",
        element: <Dashboard />,
      },
      {
        path: "/help",
        element: <Dashboard />,
      },
      {
        path: "/viewForm",
        element: <PrevFormLandingPage />,
      },
      {
        path: "/blogs",
        element: <Dashboard />,
      },
      {
        path: "/demo",
        element: (
          <PublicRoute>
            <CreateAccountLandingPage />
          </PublicRoute>
        ),
      },
      {
        path: "/welcome",
        element: (
          // <ProtectedRoute>
          <DemoLandingPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
