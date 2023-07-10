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
    if(admin === 1) {
      return <Navigate to="/admin" replace />;
    }
    else if(admin === 0) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
