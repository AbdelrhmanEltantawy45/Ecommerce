import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedAuth(props) {
  const location = useLocation();

  if (localStorage.getItem("userToken")) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return props.children;
}