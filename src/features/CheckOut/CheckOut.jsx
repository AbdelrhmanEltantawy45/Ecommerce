import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Loader2, Lock } from "lucide-react";

import { CartContext } from "../../app/Context/Cartcontext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-slate-600";
const inputClass =
  "h-14 rounded-lg border-stone-300 bg-[#fbf8f3] px-5 text-base";

export default function CheckOut() {
  let { onlinePayment, totalCartPrice, numOfCartItems } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
 
  let mySchema = Yup.object({
    details: Yup.string().required("address details are required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "not valid phone"),
    city: Yup.string().required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      payOnline(values);
    },
  });

  async function payOnline(values) {
    setIsLoading(true);
    await onlinePayment(values);
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-slate-600">
          <Link to="/" className="hover:text-emerald-950">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="hover:text-emerald-950">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-950">Checkout</span>
        </nav>

        {/* Page header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            Almost there
          </p>
          <h1 className="text-3xl font-bold text-emerald-950 md:text-5xl">
            Checkout
          </h1>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* Shipping form */}
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div>
              <h2 className="text-xl font-bold text-emerald-950">
                Shipping details
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Tell us where to deliver your order.
              </p>
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className={labelClass}>
                City
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="e.g. Cairo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                className={inputClass}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-sm text-red-600">{formik.errors.city}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className={labelClass}>
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                className={inputClass}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details" className={labelClass}>
                Address details
              </Label>
              <Textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Street, building, floor, apartment..."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                className="rounded-lg border-stone-300 bg-[#fbf8f3] px-5 py-4 text-base"
              />
              {formik.touched.details && formik.errors.details && (
                <p className="text-sm text-red-600">{formik.errors.details}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading || !(formik.isValid && formik.dirty)}
              className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Pay now
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-400 hover:underline"
              >
                <ArrowLeft size={16} /> Back to cart
              </Link>
            </div>
          </form>

          {/* Order summary */}
          <aside className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-emerald-950">
              Order summary
            </h2>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{numOfCartItems ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
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

            <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" /> Secure payment powered by Stripe
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}