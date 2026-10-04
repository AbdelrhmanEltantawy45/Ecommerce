import Footer from "../../features/Footer/Footer";
import Navbar from "../../features/Navbar/Navbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
      <div className="flex min-h-screen flex-col">
    <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
  );
}
