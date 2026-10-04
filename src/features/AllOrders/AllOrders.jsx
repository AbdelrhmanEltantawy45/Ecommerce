import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// بيفك الـ JWT ويرجّع الـ id بتاع اليوزر
function getUserIdFromToken() {
  try {
    const token = localStorage.getItem("userToken");
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).id;
  } catch {
    return null;
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [justPaid, setJustPaid] = useState(false);

  let { getCart } = useContext(CartContext);

  async function getUserOrders() {
    const userId = getUserIdFromToken();

    if (!userId) {
      setErrorMessage("Please sign in again to see your orders.");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      const list = Array.isArray(data) ? data : data?.data ?? [];
    
      setOrders(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Couldn't load orders");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
   
    const flag = sessionStorage.getItem("justPaid");
    if (flag) {
      if (Date.now() - Number(flag) < 30 * 60 * 1000) {
        setJustPaid(true);
        getCart();
      }
      sessionStorage.removeItem("justPaid");
    }

    getUserOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Success banner */}
        {justPaid && (
          <div className="mb-8 flex items-start gap-4 rounded-3xl bg-emerald-950 p-6 text-white shadow-sm md:items-center md:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-300 text-emerald-950">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-300">
                Payment received
              </p>
              <h2 className="text-2xl font-bold md:text-3xl">
                Congratulations
              </h2>
              <p className="mt-1 text-sm text-emerald-100/80">
                Purchase completed successfully. Your order is on its way to
                being prepared.
              </p>
            </div>
          </div>
        )}

        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Order history
          </p>
          <h1 className=" text-3xl font-bold text-emerald-950 md:text-5xl">
            Your orders
          </h1>
          {!isLoading && orders.length > 0 && (
            <p className="mt-3 text-slate-600">
              {orders.length} {orders.length === 1 ? "order" : "orders"} so far.
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-3xl" />
            ))}
          </div>
        ) : orders.length === 0 && !errorMessage ? (
          /* Empty state */
          <div className="flex flex-col items-center rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ede4] text-emerald-950">
              <Package className="h-7 w-7" />
            </div>
            <h2 className="mt-5  text-2xl font-bold text-emerald-950">
              No orders yet
            </h2>
            <p className="mt-2 max-w-sm text-slate-600">
              When you place an order, it will show up here.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-lg bg-emerald-950 px-6 font-semibold text-white hover:bg-emerald-900"
            >
              <Link to="/product">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order._id}
                className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order #{order.id}
                    </p>
                    <p className="mt-1 text-lg font-bold text-emerald-950">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={`rounded-full px-3 text-xs font-semibold hover:bg-opacity-100 ${
                        order.isPaid
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }`}
                    >
                      <CreditCard className="mr-1 h-3 w-3" />
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                    <Badge
                      className={`rounded-full px-3 text-xs font-semibold ${
                        order.isDelivered
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          : "bg-rose-100 text-rose-500 hover:bg-rose-100"
                      }`}
                    >
                      <Truck className="mr-1 h-3 w-3" />
                      {order.isDelivered ? "Delivered" : "In progress"}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Total
                    </p>
                    <p className=" text-2xl font-bold text-emerald-950">
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>

                {/* Product thumbnails preview */}
                <div className="flex items-center gap-2 px-5 pb-5 md:px-6">
                  {order.cartItems?.slice(0, 5).map((item) => (
                    <div
                      key={item._id}
                      className="h-14 w-14 overflow-hidden rounded-xl border border-stone-200 bg-[#fbf8f3]"
                    >
                      <img
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {order.cartItems?.length > 5 && (
                    <span className="text-sm font-medium text-slate-600">
                      +{order.cartItems.length - 5} more
                    </span>
                  )}
                </div>

                {/* Details */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-t border-stone-200">
                    <AccordionTrigger className="px-5 text-sm font-semibold text-emerald-950 hover:no-underline md:px-6">
                      Order details
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-6 md:px-6">
                      <ul className="divide-y divide-stone-200">
                        {order.cartItems?.map((item) => (
                          <li
                            key={item._id}
                            className="flex items-center gap-4 py-3"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#fbf8f3]">
                              <img
                                src={item.product?.imageCover}
                                alt={item.product?.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-1 font-bold text-emerald-950">
                                {item.product?.title}
                              </p>
                              <p className="text-sm text-slate-600">
                                {item.count} × {item.price} EGP
                              </p>
                            </div>
                            <p className="font-semibold text-emerald-950">
                              {item.count * item.price} EGP
                            </p>
                          </li>
                        ))}
                      </ul>

                      <Separator className="my-4 bg-stone-200" />

                      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                        <p className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          <span>
                            {order.shippingAddress?.city}
                            {order.shippingAddress?.details &&
                              `, ${order.shippingAddress.details}`}
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          {order.shippingAddress?.phone}
                        </p>
                        <p className="flex items-start gap-2">
                          <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          <span className="capitalize">
                            {order.paymentMethodType}
                          </span>
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}