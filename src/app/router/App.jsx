import "../../../src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../layouts/Layout/Layout";
import Home from "../../features/home/components/Home/Home";
import Products from "../../features/Products/Products";
import Brands from "../../features/Brands/Brands";
import Cart from "../../features/Cart/Cart";
import Categories from "../../features/Categories/Categories";
import Login from "../../features/auth/Login/Login";
import Register from "../../features/auth/Register/Register";
import Notfound from "../../features/Notfound/Notfound";
import ProtectedRoutes from "../../features/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "../../features/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "../../features/ProductDetails/ProductDetails";
import toast, { Toaster } from "react-hot-toast";
import BrandDetails from "../../features/BrandDetails/BrandDetails";
import AllOrders from "../../features/AllOrders/AllOrders";
import CheckOut from "../../features/CheckOut/CheckOut";
import WishList from "../../features/WishList/WishList";
import CategoriesDetails from "../../features/CategoriesDetails/CategoriesDetails";
import Forgotpassword from "../../features/auth/Forgotpassword/Forgotpassword";
import VerifyCode from "../../features/auth/Forgotpassword/VerifyCode";
import Resetpassword from "../../features/auth/Forgotpassword/Resetpassword";
import AuthLayout from "@/features/auth/AuthLayout/AuthLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from "@/features/Contact/Contact";

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
           {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
  
        {
          path: "product",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              {" "}
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              {" "}
              <Cart />
            </ProtectedRoutes>
          ),
        },
        { path: "contact", element:  <ProtectedRoutes><Contact /></ProtectedRoutes>  },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              {" "}
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brandDetails/:id",
          element: (
            <ProtectedRoutes>
              <BrandDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categoriesdetails/:id",
          element: (
            <ProtectedRoutes>
              <CategoriesDetails />
            </ProtectedRoutes>
          ),
        },

        { path: "*", element: <Notfound /> },
      ],
    },

      {
    element: <AuthLayout />,
    children: [
       
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgotpassword",
          element: (
            <ProtectedAuth>
              <Forgotpassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgotpassword/verifycode",
          element: (
            <ProtectedAuth>
              <VerifyCode />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgotpassword/verifycode/resetpassword",
          element: (
            <ProtectedAuth>
              <Resetpassword />
            </ProtectedAuth>
          ),
        },
    ],
  },
  ]);

  return (
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={3}
        containerStyle={{ top: 80 }} // علشان ما يتغطاش تحت الـ Navbar الـ fixed
        toastOptions={{
          duration: 3000,
          className: "veridian-toast",
          style: {
            background: "#fbf8f3",
            color: "#052e16",
            border: "1px solid #e7e5e4",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: 500,
            maxWidth: "380px",
            boxShadow: "0 10px 30px -10px rgba(5, 46, 22, 0.25)",
          },
          success: {
            duration: 2500,
            iconTheme: { primary: "#052e16", secondary: "#fda4af" },
            style: { borderLeft: "4px solid #052e16" },
          },
          error: {
            duration: 4000,
            iconTheme: { primary: "#e11d48", secondary: "#fff1f2" },
            style: { borderLeft: "4px solid #fb7185" },
          },
          loading: {
            iconTheme: { primary: "#052e16", secondary: "#e7e5e4" },
          },
        }}
      />
    </QueryClientProvider>
  </>
);
}

export default App;
