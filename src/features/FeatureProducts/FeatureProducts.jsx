import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Check, Heart, Loader2, ShoppingBag, Star } from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";
import useRequireAuth from "@/hooks/useRequireAuth";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeatureProducts({ showHeading = true }) {
  let {
    addToCart,
    removeCartItem,
    cartProductIds = [],
    addToWishList,
    removeWishList,
    wishListIds = [],
  } = useContext(CartContext);

  const requireAuth = useRequireAuth();

  // ID المنتج اللي بيتعمله add/remove حاليا (علشان نعرض spinner على زراره بس)
  const [pendingCartId, setPendingCartId] = useState(null);

  async function toggleWishList(productId) {
    if (!requireAuth()) return;
    if (wishListIds.includes(productId)) {
      await removeWishList(productId);
    } else {
      await addToWishList(productId);
    }
  }

  async function toggleCart(productId) {
    if (!requireAuth()) return;
    setPendingCartId(productId);
    if (cartProductIds.includes(productId)) {
      await removeCartItem(productId);
    } else {
      await addToCart(productId);
    }
    setPendingCartId(null);
  }

  function getFeatureProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getFeatureProducts,
  });

  return (
    <section
      className={`mx-auto max-w-screen-xl px-4 pb-16 ${
        showHeading ? "py-8" : "pt-8"
      }`}
    >
      {showHeading && (
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            The signature collection
          </p>
          <h2 className="font-serif text-2xl font-bold text-emerald-950 md:text-3xl">
            Objects of permanence, chosen
          </h2>
        </div>
      )}

      {isError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-2xl bg-white p-3">
              <Skeleton className="aspect-[4/5] w-full rounded-xl" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.data?.data.map((product) => {
            const isInWishList = wishListIds.includes(product._id);
            const isInCart = cartProductIds.includes(product._id);
            const isPending = pendingCartId === product._id;

            return (
              <div
                key={product._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-[#fbf8f3]">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishList(product._id)}
                    aria-label={
                      isInWishList
                        ? "Remove from wish list"
                        : "Add to wish list"
                    }
                    aria-pressed={isInWishList}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        isInWishList
                          ? "fill-rose-400 text-rose-400"
                          : "text-slate-600 hover:text-rose-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                    className="flex-1"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                      {product.category.name}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-serif text-base font-bold text-emerald-950">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">
                        {product.price} EGP
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  {/* Add / Remove from cart */}
                  <Button
                    onClick={() => toggleCart(product._id)}
                    disabled={isPending}
                    aria-pressed={isInCart}
                    aria-label={isInCart ? "Remove from cart" : "Add to cart"}
                    className={`mt-4 h-10 w-full gap-1.5 whitespace-nowrap rounded-lg px-2 text-xs font-semibold transition-colors sm:h-11 sm:gap-2 sm:px-4 sm:text-sm ${
                      isInCart
                        ? "border border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100"
                        : "bg-emerald-950 text-white hover:bg-emerald-900"
                    }`}
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isInCart ? (
                      <>
                        <Check className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                        <span className="truncate sm:hidden">Remove</span>
                        <span className="hidden truncate sm:inline">
                          Remove from cart
                        </span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                        <span className="truncate sm:hidden">Add</span>
                        <span className="hidden truncate sm:inline">
                          Add to cart
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}