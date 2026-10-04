import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeader from "../AuthLayout/AuthHeader";

const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-slate-600";
const inputClass =
  "h-14 rounded-lg border-stone-300 bg-[#fbf8f3] px-5 text-base";

export default function Register() {
  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "not less than 3 chars")
      .max(18, "not large than 18 chars"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "not valid password"),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "not valid phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerFrom(values);
    },
  });

  async function registerFrom(values) {
    setIsloading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        console.log(data.data.message);
        setUseressage(data.data.message);
        setIsloading(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrmessage(err.response.data.message);
        setIsloading(false);
      });
  }

  return (
    <>
      <AuthHeader
        eyebrow="Private client access"
        title={
          <>
            Join us <br /> at the studio
          </>
        }
        description="Create your account to save curated selections, track orders, and get exclusive early access to new collections."
      />

      {userMessage && (
        <div
          className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
          role="alert"
        >
          {userMessage}
        </div>
      )}

      {errmessage && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {errmessage}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className={labelClass}>
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className={inputClass}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-600">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClass}>
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className={inputClass}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600">{formik.errors.email}</p>
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

        {/* Password + Confirm (جنب بعض في الشاشات الكبيرة) */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className={labelClass}>
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="rePassword" className={labelClass}>
              Confirm password
            </Label>
            <div className="relative">
              <Input
                id="rePassword"
                name="rePassword"
                type={showRePassword ? "text" : "password"}
                placeholder="Repeat your password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowRePassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                aria-label="Toggle confirm password visibility"
              >
                {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-sm text-red-600">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isloading || !(formik.isValid && formik.dirty)}
          className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
        >
          {isloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Create account"
          )}
        </Button>

        <p className="pt-2 text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-rose-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}