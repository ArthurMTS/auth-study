import { Routes, Route } from "react-router-dom";

import {
  Dashboard,
  Home,
  LoginAdmin,
  LoginUser,
  PageRoutes,
  SigninAdmin,
  SigninUser,
} from "@/pages";
import { PrivateRouter } from "@/components/PrivateRouter";

export const Router = () => {
  return (
    <Routes>
      <Route
        path={PageRoutes.login}
        element={
          <LoginUser />
        }
      />
      <Route
        path={PageRoutes.signin}
        element={
          <SigninUser />
        }
      />
      <Route
        path={PageRoutes.loginAdmin}
        element={
          <LoginAdmin />
        }
      />
      <Route
        path={PageRoutes.signinAdmin}
        element={
          <SigninAdmin />
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
