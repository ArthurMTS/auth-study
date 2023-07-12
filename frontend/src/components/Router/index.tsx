import { Routes, Route, Navigate } from "react-router-dom";

import {
  Dashboard,
  Home,
  LoginAdmin,
  LoginUser,
  PageRoutes,
  SigninAdmin,
  SigninUser,
} from "@/pages";
import { PrivateRouter } from "../PrivateRouter";
import { useContext } from "react";
import { UserContext } from "@/contexts/user";

export const Router = () => {
  const { auth, user } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path={PageRoutes.login}
        element={
          auth && user.admin === 0 ? (
            <Navigate to="/home" replace />
          ) : (
            <LoginUser />
          )
        }
      />
      <Route
        path={PageRoutes.signin}
        element={
          auth && user.admin === 0 ? (
            <Navigate to="/home" replace />
          ) : (
            <SigninUser />
          )
        }
      />
      <Route
        path={PageRoutes.loginAdmin}
        element={
          auth && user.admin === 1 ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginAdmin />
          )
        }
      />
      <Route
        path={PageRoutes.signinAdmin}
        element={
          auth && user.admin === 1 ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <SigninAdmin />
          )
        }
      />
      <Route
        path={PageRoutes.home}
        element={
          <PrivateRouter admin={0}>
            <Home />
          </PrivateRouter>
        }
      />
      <Route
        path={PageRoutes.dashboard}
        element={
          <PrivateRouter admin={1}>
            <Dashboard />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
