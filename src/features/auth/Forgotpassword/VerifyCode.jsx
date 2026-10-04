import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Loader2, RotateCw } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthHeader from "../AuthLayout/AuthHeader";

const MIN_LENGTH = 4; 
const RESEND_SECONDS = 60;

const slotClass =
  "h-14 w-10 rounded-lg border border-stone-300 bg-[#fbf8f3] text-xl font-semibold text-emerald-950 sm:w-12";

export default function VerifyCode() {
  const [userMessage, setUseressage] = useState(null);
  const [errmessage, setErrmessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  let navigate = useNavigate();
  const otpRef = useRef(null);

  const MIN_LENGTH = 4;
const MAX_LENGTH = 8;

  let mySchema = Yup.object({
    resetCode: Yup.string()
      .required("code is required")
      .matches(/^\d+$/, "code must contain digits only")
      .min(MIN_LENGTH, `code must be at least ${MIN_LENGTH} digits`)
      .max(MAX_LENGTH, `code must be at most ${MAX_LENGTH} digits`),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      verifyForm(values);
    },
  });

  async function verifyForm(values) {
    if (isloading) return;
    setIsloading(true);
    setErrmessage(null);
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((data) => {
        setUseressage(data.data.message);
        setIsloading(false);
        navigate("/forgotpassword/verifycode/resetpassword");
      })
      .catch((err) => {
        setErrmessage(err.response?.data?.message || "Invalid or expired code");
        setIsloading(false);
      
        formik.resetForm();
        setTimeout(() => otpRef.current?.focus(), 0);
      });
  }


  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  async function resendCode() {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      setErrmessage("Please enter your email again to receive a new code.");
      return;
    }

    setIsResending(true);
    setErrmessage(null);
    setUseressage(null);

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      setUseressage(data.message || "A new code has been sent to your email.");
      setCountdown(RESEND_SECONDS);
      formik.resetForm();
      otpRef.current?.focus();
    } catch (err) {
      setErrmessage(err.response?.data?.message || "Couldn't resend the code");
    } finally {
      setIsResending(false);
    }
  }

  const codeLength = formik.values.resetCode.length;
  const canSubmit = codeLength >= MIN_LENGTH && !isloading;

  const visibleSlots = Math.min(
    MAX_LENGTH,
    Math.max(MIN_LENGTH, codeLength + 1)
  );

  return (
    <>
      <AuthHeader
        eyebrow="Account recovery"
        title={
          <>
            Check your <br /> inbox
          </>
        }
        description="We've sent a verification code to your email. Enter it below to continue."
      />

      {userMessage && (
        <div
          className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
          role="status"
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
        <div className="space-y-3">
          <Label
            htmlFor="resetCode"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Verification code
          </Label>

          <InputOTP
            ref={otpRef}
            id="resetCode"
            name="resetCode"
            maxLength={MAX_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            disabled={isloading}
            value={formik.values.resetCode}
            onChange={(value) => {
              formik.setFieldValue("resetCode", value);
              setErrmessage(null);
            }}
            onBlur={() => formik.setFieldTouched("resetCode", true)}
            pasteTransformer={(pasted) =>
              pasted.replace(/\D/g, "").slice(0, MAX_LENGTH)
            }
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: visibleSlots }).map((_, i) => (
                <InputOTPSlot key={i} index={i} className={slotClass} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <p className="text-xs text-slate-500">
            Enter the code exactly as it appears in your email, then press
            Verify.
          </p>

          {formik.touched.resetCode &&
            formik.errors.resetCode &&
            codeLength > 0 && (
              <p className="text-sm text-red-600">{formik.errors.resetCode}</p>
            )}
        </div>

        <Button
          type="submit"
          disabled={!canSubmit}
          className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
        >
          {isloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Verify code"
          )}
        </Button>

        {/* Resend */}
        <div className="text-center text-sm text-slate-600">
          Didn't get the code?{" "}
          {countdown > 0 ? (
            <span className="font-semibold text-slate-500">
              Resend in {countdown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={resendCode}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 font-semibold text-rose-400 hover:underline disabled:opacity-50"
            >
              {isResending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RotateCw className="h-3.5 w-3.5" />
              )}
              Resend code
            </button>
          )}
        </div>

        <div className="pt-2 text-center">
          <Link
            to="/forgotpassword"
            className="inline-flex items-center gap-2 font-semibold text-rose-400 hover:underline"
          >
            <ArrowLeft size={16} /> Use a different email
          </Link>
        </div>
      </form>
    </>
  );
}