import { createBrowserRouter, useNavigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import Role from "../pages/Role";
import User from "../pages/User";

import MiniDrawer from "../components/Drawer/Drawer";
import { useEffect } from "react";
import ProtectedRoutes from "../helper/ProtectedRoutes";



// ProtectedRoutes.js










export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <ProtectedRoutes ><MiniDrawer/></ProtectedRoutes >,
    children: [
      {
        path: '/role',
        element: <Role />
      },
      {
        path: '/user',
        element: <User />
      }
    ]
  }
]);
