import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, ShoppingBag, Heart } from "lucide-react";

import Logo from "./../../assets/freshcart-logo.svg";
import { TokenContext } from "../../app/Context/TokenContext";
import { CartContext } from "../../app/Context/Cartcontext";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  let {
    numOfCartItems,
    getCart,
    numOfWishListItems = 0,
    getToWishList,
    resetCounters,
  } = useContext(CartContext);
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    resetCounters();
    setOpen(false);
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCart();
      getToWishList();
    }
  }, [token]);

  const desktopLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors hover:text-emerald-950 ${
      isActive
        ? "text-emerald-950 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-rose-400"
        : "text-slate-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
      isActive
        ? "bg-emerald-950 text-white"
        : "text-slate-700 hover:bg-[#f6ede4]"
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-stone-200 bg-[#fbf8f3]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-8" alt="Logo" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={desktopLinkClass}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {token ? (
            <>
              {/* Wishlist */}
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative hidden text-slate-700 hover:bg-[#f6ede4] hover:text-emerald-950 md:inline-flex"
              >
                <Link to="/wishlist" aria-label="Wish list">
                  <Heart className="h-5 w-5" />
                  {numOfWishListItems > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-rose-400 px-1 text-[10px] text-white hover:bg-rose-400">
                      {numOfWishListItems}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Cart */}
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative text-slate-700 hover:bg-[#f6ede4] hover:text-emerald-950"
              >
                <Link to="/cart" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-rose-400 px-1 text-[10px] text-white hover:bg-rose-400">
                    {numOfCartItems ?? 0}
                  </Badge>
                </Link>
              </Button>

              {/* Logout (desktop) */}
              <Button
                onClick={logout}
                variant="outline"
                className="hidden rounded-lg border-stone-300 bg-white text-slate-700 hover:bg-[#f6ede4] md:inline-flex"
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button
                asChild
                variant="ghost"
                className="text-slate-700 hover:bg-[#f6ede4] hover:text-emerald-950"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="rounded-lg bg-emerald-950 text-white hover:bg-emerald-900"
              >
                <Link to="/register" className="text-rose-300">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 hover:bg-[#f6ede4] md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-[#fbf8f3] p-0">
              <SheetHeader className="border-b border-stone-200 p-5">
                <SheetTitle>
                  <img src={Logo} className="h-8" alt="Logo" />
                </SheetTitle>
              </SheetHeader>

              <div className="flex h-[calc(100%-5rem)] flex-col justify-between p-4">
                <ul className="space-y-1">
                  {links.map((l) => (
                    <li key={l.to}>
                      <SheetClose asChild>
                        <NavLink
                          to={l.to}
                          end={l.to === "/"}
                          className={mobileLinkClass}
                        >
                          {l.label}
                        </NavLink>
                      </SheetClose>
                    </li>
                  ))}

                  {token && (
                    <>
                      <li>
                        <SheetClose asChild>
                          <NavLink to="/wishlist" className={mobileLinkClass}>
                            <span className="flex items-center justify-between">
                              Wish List
                              <Badge className="rounded-full bg-rose-400 text-white hover:bg-rose-400">
                                {numOfWishListItems}
                              </Badge>
                            </span>
                          </NavLink>
                        </SheetClose>
                      </li>

                      <li>
                        <SheetClose asChild>
                          <NavLink to="/cart" className={mobileLinkClass}>
                            <span className="flex items-center justify-between">
                              Cart
                              <Badge className="rounded-full bg-rose-400 text-white hover:bg-rose-400">
                                {numOfCartItems ?? 0}
                              </Badge>
                            </span>
                          </NavLink>
                        </SheetClose>
                      </li>
                    </>
                  )}
                </ul>

                {token ? (
                  <Button
                    onClick={logout}
                    className="h-12 w-full rounded-lg bg-emerald-950 text-white hover:bg-emerald-900"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="h-12 w-full rounded-lg border-stone-300 bg-white"
                      >
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="h-12 w-full rounded-lg bg-emerald-950 text-white hover:bg-emerald-900"
                      >
                        <Link to="/register" className="text-rose-300">
                          Register
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}