import { UserContext } from "@/contexts/user";
import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
  children: ReactElement;
  admin: 0 | 1;
}

export const PrivateRouter: React.FC<PrivateRouterProps> = ({ children, admin }) => {
  const { auth } = useContext(UserContext);

  if(!auth) {
    if(!admin) return <Navigate to="/" replace />;
    else return <Navigate to="/admin" replace />;
  }

  return children;
};
