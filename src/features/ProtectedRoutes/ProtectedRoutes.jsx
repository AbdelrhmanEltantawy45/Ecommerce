import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const location = useLocation();

  if (localStorage.getItem("userToken")) {
    return props.children;
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname + location.search }}
    />
  );
}