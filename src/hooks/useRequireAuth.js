import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  return function requireAuth() {
    if (localStorage.getItem("userToken")) return true;

    toast("Please sign in to continue");
    navigate("/login", {
      state: { from: location.pathname + location.search },
    });
    return false;
  };
}