import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Check,
  ChevronRight,
  Heart,
  Loader2,
  ShoppingBag,
  Star,
} from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";
import useRequireAuth from "@/hooks/useRequireAuth";
import ProductReviews from "./ProductReviews";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export default function ProductDetails() {
  let { id, category } = useParams();

  let {
    addToCart,
    removeCartItem,
    cartProductIds = [],
    addToWishList,
    removeWishList,
    wishListIds = [],
  } = useContext(CartContext);

  const requireAuth = useRequireAuth();

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

  const [productDetailes, setProductDetailes] = useState({});
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);


  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  async function getproductDetailes() {
    setIsloading(true);
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProductDetailes(data?.data.data);
        setIsloading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err);
        setIsloading(false);
      });
  }

  async function getRelatedProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        let relatedProducts = data?.data.data;
        relatedProducts = relatedProducts.filter(
          (product) => product.category.name == category
        );
        setRelatedProduct(relatedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    getproductDetailes();
    getRelatedProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const isInWishList = wishListIds.includes(productDetailes?._id);
  const isInCart = cartProductIds.includes(productDetailes?._id);
  const isMainPending = pendingCartId === productDetailes?._id;

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-slate-600">
          <Link to="/" className="hover:text-emerald-950">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/product" className="hover:text-emerald-950">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 text-emerald-950">
            {productDetailes?.title ?? category}
          </span>
        </nav>

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            {errorMessage}
          </div>
        )}

        {isloading ? (
          <div className="grid gap-8 rounded-3xl bg-white p-4 md:grid-cols-2 md:p-8">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-14 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-2 md:p-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                className="group relative"
              >
                <CarouselContent className="ml-0">
                  {productDetailes?.images?.map((src, i) => (
                    <CarouselItem key={i} className="pl-0">
                      <div className="aspect-square overflow-hidden rounded-2xl bg-[#fbf8f3]">
                        <img
                          src={src}
                          alt={productDetailes.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-3 hidden border-0 bg-white/90 text-emerald-950 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 md:inline-flex" />
                <CarouselNext className="right-3 hidden border-0 bg-white/90 text-emerald-950 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 md:inline-flex" />
              </Carousel>

              {/* Thumbnails */}
              {productDetailes?.images?.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {productDetailes.images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-20 sm:w-20 ${
                        current === i
                          ? "border-emerald-950"
                          : "border-stone-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <Badge className="w-fit rounded-full bg-rose-100 px-3 text-xs font-semibold uppercase tracking-wide text-rose-500 hover:bg-rose-100">
                {productDetailes.category?.name}
              </Badge>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 md:text-4xl">
                {productDetailes.title}
              </h1>

              <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {productDetailes.ratingsAverage}
                </span>
                <span>•</span>
                <span>{productDetailes.ratingsQuantity} reviews</span>
              </div>

              <p className="mt-6 leading-relaxed text-slate-600">
                {productDetailes.description}
              </p>

              <Separator className="my-6 bg-stone-200" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </p>
                  <p className="text-3xl font-bold text-emerald-950">
                    {productDetailes.price}{" "}
                    <span className="text-base font-semibold text-slate-600">
                      EGP
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {/* Add / Remove from cart */}
                <Button
                  onClick={() => toggleCart(productDetailes._id)}
                  disabled={isMainPending}
                  aria-pressed={isInCart}
                  className={`h-14 flex-1 gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition-colors sm:text-base ${
                    isInCart
                      ? "border border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100"
                      : "bg-emerald-950 text-white hover:bg-emerald-900"
                  }`}
                >
                  {isMainPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isInCart ? (
                    <>
                      <Check className="h-5 w-5 shrink-0" />
                      <span className="truncate">Remove from cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 shrink-0" />
                      <span className="truncate">Add to cart</span>
                    </>
                  )}
                </Button>

                {/* Wishlist */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toggleWishList(productDetailes._id)}
                  aria-label={
                    isInWishList ? "Remove from wish list" : "Add to wish list"
                  }
                  aria-pressed={isInWishList}
                  className="h-14 w-14 rounded-lg border-stone-300 bg-white p-0 hover:bg-[#fbf8f3]"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      isInWishList
                        ? "fill-rose-400 text-rose-400"
                        : "text-slate-600"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {!isloading && productDetailes?._id && (
          <ProductReviews productId={productDetailes._id} />
        )}

        {/* Related products */}
        {relatedProduct.length > 1 && (
          <section className="mt-16">
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
                You may also like
              </p>
              <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
                Related products
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {relatedProduct
                .filter((product) => product._id !== productDetailes._id)
                .map((product) => {
                  const inWishList = wishListIds.includes(product._id);
                  const inCart = cartProductIds.includes(product._id);
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

                        <button
                          type="button"
                          onClick={() => toggleWishList(product._id)}
                          aria-label={
                            inWishList
                              ? "Remove from wish list"
                              : "Add to wish list"
                          }
                          aria-pressed={inWishList}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              inWishList
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
                          <h3 className="mt-1 line-clamp-1 text-base font-bold text-emerald-950">
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

                        <Button
                          onClick={() => toggleCart(product._id)}
                          disabled={isPending}
                          aria-pressed={inCart}
                          aria-label={
                            inCart ? "Remove from cart" : "Add to cart"
                          }
                          className={`mt-4 h-10 w-full gap-1.5 whitespace-nowrap rounded-lg px-2 text-xs font-semibold transition-colors sm:h-11 sm:gap-2 sm:px-4 sm:text-sm ${
                            inCart
                              ? "border border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100"
                              : "bg-emerald-950 text-white hover:bg-emerald-900"
                          }`}
                        >
                          {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : inCart ? (
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
          </section>
        )}
      </div>
    </main>
  );
}