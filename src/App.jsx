import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import BrandDetails from './components/BrandDetails/BrandDetails';
import AllOrders from './components/AllOrders/AllOrders';
import CheckOut from './components/CheckOut/CheckOut';
import WishList from './components/WishList/WishList';
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails';

function App() {

  const queryClient = new QueryClient()
  

  let routes = createBrowserRouter([
    {path:"", element:<Layout/> ,children:[
      {index:true, element: <ProtectedRoutes><Home/></ProtectedRoutes> },
      {path:"login", element: <ProtectedAuth><Login/></ProtectedAuth> }, 
      {path:"register", element: <ProtectedAuth><Register/></ProtectedAuth> }, 
      {path:"product", element: <ProtectedRoutes><Products/></ProtectedRoutes> }, 
      {path:"allorders", element: <ProtectedRoutes><AllOrders/></ProtectedRoutes> }, 
      {path:"checkout", element: <ProtectedRoutes><CheckOut/></ProtectedRoutes> }, 
      {path:"brands", element: <ProtectedRoutes> <Brands/></ProtectedRoutes> }, 
      {path:"cart", element: <ProtectedRoutes> <Cart/></ProtectedRoutes> }, 
      {path:"wishlist", element: <ProtectedRoutes> <WishList/></ProtectedRoutes> }, 
      {path:"categories", element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"productdetails/:id/:category", element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"brandDetails/:id", element: <ProtectedRoutes><BrandDetails/></ProtectedRoutes>},
      {path:"categoriesdetails/:id", element: <ProtectedRoutes><CategoriesDetails/></ProtectedRoutes>},
     
      {path:"*", element:<Notfound/>}, 
    ]}
  ])

  return (
    <>

    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}></RouterProvider>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </QueryClientProvider>


    </>
  )
}

export default App
