import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, X } from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishList() {
  const [wishListItem, setwishListItem] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  let { getToWishList, addToCart, removeWishList } = useContext(CartContext);

  async function getAllWishList() {
    let response = await getToWishList();
    setwishListItem(response?.data?.data ?? []);
    setisLoading(false);
  }

  async function addcartitem(productId) {
    let response = await addToCart(productId);
    console.log(response);
    setisLoading(false);
  }

  async function clearWishListitem(productId) {
   
    setwishListItem((prev) => prev.filter((p) => p._id !== productId));
    let response = await removeWishList(productId);
    console.log(response);
    getAllWishList();
  }

  useEffect(() => {
    getAllWishList();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Saved for later
          </p>
          <h1 className="font-serif text-3xl font-bold text-emerald-950 md:text-5xl">
            Your wish list
          </h1>
          {!isLoading && wishListItem.length > 0 && (
            <p className="mt-3 text-slate-600">
              {wishListItem.length}{" "}
              {wishListItem.length === 1 ? "piece" : "pieces"} you love.
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-2xl bg-white p-3">
                <Skeleton className="aspect-[4/5] w-full rounded-xl" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : wishListItem.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-400">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-emerald-950">
              Your wish list is empty
            </h2>
            <p className="mt-2 max-w-sm text-slate-600">
              Tap the heart on any piece you love and it will be saved here.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-lg bg-emerald-950 px-6 font-semibold text-white hover:bg-emerald-900"
            >
              <Link to="/product" className="text-white">Explore the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {wishListItem.map((item) => (
              <div
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <Link
                    to={`/productdetails/${item.id}/${item.category?.name}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-[#fbf8f3]">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => clearWishListitem(item._id)}
                    aria-label="Remove from wish list"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex-1">
                    {item.category?.name && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                        {item.category.name}
                      </p>
                    )}
                    <h3 className="mt-1 line-clamp-1 font-serif text-base font-bold text-emerald-950">
                      {item.title?.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">
                        {item.price} EGP
                      </span>
                      {item.ratingsAverage && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {item.ratingsAverage}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => addcartitem(item._id)}
                    className="mt-4 h-11 w-full rounded-lg bg-emerald-950 text-sm font-semibold text-white hover:bg-emerald-900"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}