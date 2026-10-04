import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-slate-600";
const inputClass =
  "h-14 rounded-lg border-stone-300 bg-[#fbf8f3] px-5 text-base";

const contactInfo = [
  { icon: MapPin, title: "Visit us", text: "Cairo, Egypt" },
  { icon: Phone, title: "Call us", text: "+20 100 000 0000" },
  { icon: Mail, title: "Email us", text: "hello@veridian.com" },
  { icon: Clock, title: "Opening hours", text: "Sat – Thu, 10:00 – 18:00" },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most orders arrive within 3 to 5 working days, depending on your city.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Yes, as long as the order hasn't been prepared yet. Contact us as soon as possible with your order number.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept secure online card payments at checkout.",
  },
];

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "not less than 3 chars"),
    email: Yup.string().required("email is required").email("not valid email"),
    subject: Yup.string().required("subject is required"),
    message: Yup.string()
      .required("message is required")
      .min(10, "message is too short"),
  });

  let formik = useFormik({
    initialValues: { name: "", email: "", subject: "", message: "" },
    validationSchema: mySchema,
    onSubmit: (values, { resetForm }) => {
      sendMessage(values, resetForm);
    },
  });

  function sendMessage(values, resetForm) {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Thank you! We'll get back to you shortly.");
      resetForm();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <main className="min-h-screen bg-[#f6ede4] pt-16">
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
            We'd love to hear from you
          </p>
          <h1 className="text-3xl font-bold text-emerald-950 md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Questions about an order, a piece, or anything else? Send us a
            message and our team will reply within one working day.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div>
              <h2 className="text-xl font-bold text-emerald-950">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Fill in the form and we'll be in touch.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className={labelClass}>
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.subject}
                className={inputClass}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="text-sm text-red-600">{formik.errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className={labelClass}>
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Write your message here..."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
                className="rounded-lg border-stone-300 bg-[#fbf8f3] px-5 py-4 text-base"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-sm text-red-600">{formik.errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !(formik.isValid && formik.dirty)}
              className="h-14 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900 sm:w-auto sm:px-10"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send message
                </>
              )}
            </Button>
          </form>

          {/* Info + FAQ */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-emerald-950 p-6 text-white shadow-sm md:p-8">
              <h2 className="text-xl font-bold">Contact details</h2>
              <ul className="mt-5 space-y-5">
                {contactInfo.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-rose-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-rose-300">
                        {title}
                      </p>
                      <p className="mt-0.5 text-sm text-emerald-100/90">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold text-emerald-950">
                Quick answers
              </h2>
              <Accordion type="single" collapsible className="mt-2">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-stone-200"
                  >
                    <AccordionTrigger className="text-left text-sm font-semibold text-emerald-950 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}