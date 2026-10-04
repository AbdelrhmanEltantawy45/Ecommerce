import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

import Logo from "./../../assets/freshcart-logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const shopLinks = [
  { to: "/product", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/wishlist", label: "Wish List" },
];

const accountLinks = [
  { to: "/cart", label: "My Cart" },
  { to: "/allorders", label: "Orders" },
  { to: "/login", label: "Sign in" },
  { to: "/register", label: "Create account" },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
];

const linkClass =
  "text-sm text-emerald-100/80 transition-colors hover:text-rose-300";

export default function Footer() {
  const [email, setEmail] = useState("");


  function handleSubscribe(e) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <footer className="mt-10 bg-emerald-950 text-white">
      {/* Newsletter */}
      <div className="mx-auto max-w-screen-xl px-4 pt-14">
        <div className="flex flex-col gap-6 rounded-3xl bg-emerald-900/60 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-300">
              Private client list
            </p>
            <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
              Be first to the new collections
            </h3>
            <p className="mt-3 text-sm text-emerald-100/80">
              Join our list for early access, curated selections, and exclusive
              offers.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-md"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-100/60" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="h-12 rounded-lg border-emerald-800 bg-emerald-950/60 pl-11 text-white placeholder:text-emerald-100/50 focus-visible:ring-rose-300"
              />
            </div>
            <Button
              type="submit"
              className="h-12 rounded-lg bg-rose-300 px-6 font-semibold text-emerald-950 hover:bg-rose-200"
            >
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-screen-xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block">
            <img src={Logo} alt="Logo" className="h-8 brightness-0 invert" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-emerald-100/80">
            A boutique of carefully chosen objects, made to last and delivered
            with care.
          </p>

          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-800 text-emerald-100 transition-colors hover:border-rose-300 hover:bg-rose-300 hover:text-emerald-950"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-4 text-lg font-bold">Shop</h4>
          <ul className="space-y-3">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="mb-4 text-lg font-bold">Account</h4>
          <ul className="space-y-3">
            {accountLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-lg font-bold">Contact</h4>
          <ul className="space-y-3 text-sm text-emerald-100/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              Cairo, Egypt
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              +20 100 000 0000
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              hello@veridian.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-screen-xl px-4">
        <Separator className="bg-emerald-800" />
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-emerald-100/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Veridian. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-rose-300">
              Privacy Policy
            </Link> 
            <Link to="#" className="hover:text-rose-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}