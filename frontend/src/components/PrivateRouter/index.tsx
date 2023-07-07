import { UserContext } from "@/contexts/user";
import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
  children: ReactElement;
}

export const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { auth } = useContext(UserContext);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
