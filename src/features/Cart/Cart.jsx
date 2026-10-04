import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Cart() {
  const [CartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { getCart, removeCartItem, updateProduct, clearAllCart, totalCartPrice } =
    useContext(CartContext);

  async function getAllCart() {
    let response = await getCart();
    setCartItems(response?.data?.data?.products ?? []);
    setIsLoading(false);
  }

  async function removeProduct(productId) {
    let response = await removeCartItem(productId);
    setCartItems(response?.data?.data?.products ?? CartItems);
  }

  async function updateCartProduct(productId, count) {
    if (count < 1) return;
    let response = await updateProduct(productId, count);
    setCartItems(response?.data?.data?.products ?? CartItems);
  }

  async function clearCart() {
    await clearAllCart();
    setCartItems([]);
  }

  useEffect(() => {
    getAllCart();
  }, []);

 
  const QtyControl = ({ item }) => (
    <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={item.count <= 1}
        onClick={() => updateCartProduct(item.product.id, item.count - 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-[#f6ede4] disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold text-emerald-950">
        {item.count}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => updateCartProduct(item.product.id, item.count + 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-[#f6ede4]"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
              Your selections
            </p>
            <h1 className="text-3xl font-bold text-emerald-950 md:text-5xl">
              Shopping cart
            </h1>
          </div>

          {!isLoading && CartItems.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-lg border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Clear cart
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl bg-[#fbf8f3]">
                <AlertDialogHeader>
                  <AlertDialogTitle className=" text-emerald-950">
                    Clear your cart?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all items from your cart. This action
                    can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearCart}
                    className="rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Yes, clear it
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4 rounded-3xl bg-white p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        ) : CartItems.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ede4] text-emerald-950">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-emerald-950">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-sm text-slate-600">
              Looks like you haven't added anything yet. Explore the collection
              and find something you love.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-lg bg-emerald-950 px-6 font-semibold text-white hover:bg-emerald-900"
            >
              <Link to="/product" className="text-white">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
            {/* Items */}
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
              {/* Desktop table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#fbf8f3] hover:bg-[#fbf8f3]">
                      <TableHead className="w-28 pl-6">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Product
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Qty
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Unit price
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Total
                      </TableHead>
                      <TableHead className="pr-6 text-right">
                        <span className="sr-only">Remove</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CartItems.map((item) => (
                      <TableRow key={item.product.id} className="border-stone-200">
                        <TableCell className="pl-6">
                          <div className="h-20 w-20 overflow-hidden rounded-xl bg-[#fbf8f3]">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[220px]">
                          <p className="line-clamp-2 font-bold text-emerald-950">
                            {item.product.title}
                          </p>
                        </TableCell>
                        <TableCell>
                          <QtyControl item={item} />
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {item.price} EGP
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-950">
                          {item.price * item.count} EGP
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove item"
                            onClick={() => removeProduct(item.product.id)}
                            className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile cards */}
              <ul className="divide-y divide-stone-200 md:hidden">
                {CartItems.map((item) => (
                  <li key={item.product.id} className="flex gap-4 p-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#fbf8f3]">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 font-bold text-emerald-950">
                          {item.product.title}
                        </p>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeProduct(item.product.id)}
                          className="text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm text-slate-600">
                        {item.price} EGP
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <QtyControl item={item} />
                        <span className="font-semibold text-emerald-950">
                          {item.price * item.count} EGP
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order summary */}
            <aside className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className=" text-xl font-bold text-emerald-950">
                Order summary
              </h2>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>
                    {CartItems.reduce((sum, item) => sum + item.count, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <Separator className="my-5 bg-stone-200" />

              <div className="flex items-end justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </span>
                <span className=" text-2xl font-bold text-emerald-950">
                  {totalCartPrice} EGP
                </span>
              </div>

              <Button
                asChild
                className="mt-6 h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
              >
                <Link to="/checkout" className="text-rose-500">Checkout</Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="mt-2 w-full text-slate-600 hover:bg-[#f6ede4]"
              >
                <Link to="/product" className="text-rose-500 hover:underline">Continue shopping</Link>
              </Button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}