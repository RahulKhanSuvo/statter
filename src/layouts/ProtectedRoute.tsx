import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
