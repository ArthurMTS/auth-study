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
import { PrivateRouter } from "../PrivateRouter";

export const Router = () => {
  return (
    <Routes>
      <Route path={PageRoutes.login} element={<LoginUser />} />
      <Route path={PageRoutes.signin} element={<SigninUser />} />
      <Route path={PageRoutes.loginAdmin} element={<LoginAdmin />} />
      <Route path={PageRoutes.signinAdmin} element={<SigninAdmin />} />
      <Route
        path={PageRoutes.home}
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />
      <Route
        path={PageRoutes.dashboard}
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
