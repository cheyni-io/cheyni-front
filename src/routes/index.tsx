import { Navigate, createBrowserRouter } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

import MainLayout from "src/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MAIN_PATH.root,
        element: <Navigate to={`/${MAIN_PATH.browse}`} />,
      },
      {
        path: MAIN_PATH.browse,
        lazy: () => import("src/pages/HomePage"),
      },
      {
        path: MAIN_PATH.genreExplore,
        children: [
          {
            path: ":genreId",
            lazy: () => import("src/pages/GenreExplore"),
          },
        ],
      },
      {
        path: MAIN_PATH.watch,
        children: [
          {
            path: ":watchId",
            lazy: () => import("src/pages/WatchPage"),
          },
        ],
      },
      // {
      //   path: MAIN_PATH.watch,
      //   lazy: () => import("src/pages/WatchPage"),
      // },
      {
        path: MAIN_PATH.signup,
        lazy: () => import("src/pages/SignUpPage")
      },
      {
        path: MAIN_PATH.login,
        lazy: () => import("src/pages/LoginPage"),
      },
      {
        path: MAIN_PATH.profile,
        lazy: () => import("src/pages/ProfilePage"),
      },
      {
        path: MAIN_PATH.wallet,
        lazy: () => import("src/pages/WalletPage"),
      },
      {
        path: MAIN_PATH.forgotPassword,
        lazy: () => import("src/pages/ForgetPassword"),
      }
    ],
  },
]);

export default router;
