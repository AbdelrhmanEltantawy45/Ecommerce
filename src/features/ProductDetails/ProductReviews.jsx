import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader2, Pencil, Star, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

const getHeaders = () => ({
  token: localStorage.getItem("userToken"),
  "Content-Type": "application/json",
});


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
function StarsDisplay({ value = 0, size = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${
            n <= Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "text-stone-300"
          }`}
        />
      ))}
    </div>
  );
}


function StarsInput({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          className="p-0.5"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              n <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-stone-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("userToken");
  const userId = getUserIdFromToken();

  async function getReviews() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/products/${productId}/reviews`
      );
      const list = data?.data ?? [];
      setReviews(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    resetForm();
    getReviews();
  }, [productId]);

  function resetForm() {
    setRating(0);
    setText("");
    setEditingId(null);
  }

 
  const myReview = useMemo(
    () => reviews.find((r) => (r.user?._id ?? r.user) === userId),
    [reviews, userId]
  );


  const summary = useMemo(() => {
    const total = reviews.length;
    const avg = total
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total
      : 0;
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Math.round(r.rating) === star).length,
    }));
    return { total, avg, counts };
  }, [reviews]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");
    if (text.trim().length < 2) return toast.error("Please write a review");

    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(
          `${BASE_URL}/reviews/${editingId}`,
          { review: text.trim(), rating },
          { headers: getHeaders() }
        );
        toast.success("Review updated");
      } else {
        await axios.post(
          `${BASE_URL}/products/${productId}/reviews`,
          { review: text.trim(), rating },
          { headers: getHeaders() }
        );
        toast.success("Thanks for your review!");
      }
      resetForm();
      await getReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEdit(review) {
    setEditingId(review._id);
    setRating(review.rating);
    setText(review.review);
    document
      .getElementById("review-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function confirmDelete() {
    try {
      await axios.delete(`${BASE_URL}/reviews/${deleteId}`, {
        headers: getHeaders(),
      });
      toast.success("Review deleted");
      if (editingId === deleteId) resetForm();
      await getReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete review");
    } finally {
      setDeleteId(null);
    }
  }

  const showForm = token && (!myReview || editingId);

  return (
    <section className="mt-16">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400">
          Customer feedback
        </p>
        <h2 className=" text-2xl font-bold text-emerald-950 md:text-3xl">
          Reviews
        </h2>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
        {/* Left: summary + form */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <p className=" text-5xl font-bold text-emerald-950">
                    {summary.avg.toFixed(1)}
                  </p>
                  <div>
                    <StarsDisplay value={summary.avg} size="h-5 w-5" />
                    <p className="mt-1 text-sm text-slate-600">
                      {summary.total}{" "}
                      {summary.total === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {summary.counts.map(({ star, count }) => {
                    const pct = summary.total
                      ? (count / summary.total) * 100
                      : 0;
                    return (
                      <div
                        key={star}
                        className="flex items-center gap-3 text-xs text-slate-600"
                      >
                        <span className="flex w-6 items-center gap-0.5">
                          {star}
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-5 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Form / prompts */}
          {!token ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-sm">
              <p className=" text-lg font-bold text-emerald-950">
                Share your thoughts
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Sign in to write a review.
              </p>
              <Button
                asChild
                className="mt-4 h-11 rounded-lg bg-emerald-950 px-6 text-white hover:bg-emerald-900"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          ) : showForm ? (
            <form
              id="review-form"
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h3 className=" text-lg font-bold text-emerald-950">
                  {editingId ? "Edit your review" : "Write a review"}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    aria-label="Cancel editing"
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Your rating
                </Label>
                <StarsInput value={rating} onChange={setRating} />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="review"
                  className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Your review
                </Label>
                <Textarea
                  id="review"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What did you like or dislike?"
                  className="rounded-lg border-stone-300 bg-[#fbf8f3] px-4 py-3 text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-lg bg-emerald-950 text-base font-semibold text-white hover:bg-emerald-900"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : editingId ? (
                  "Update review"
                ) : (
                  "Submit review"
                )}
              </Button>
            </form>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-sm">
              <p className=" text-lg font-bold text-emerald-950">
                Thanks for reviewing!
              </p>
              <p className="mt-1 text-sm text-slate-600">
                You've already reviewed this product. You can edit or delete
                your review from the list.
              </p>
            </div>
          )}
        </div>

        {/* Right: list */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-3xl" />
            ))
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-stone-200 bg-white px-6 py-14 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f6ede4] text-emerald-950">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-emerald-950">
                No reviews yet
              </h3>
              <p className="mt-1 max-w-xs text-sm text-slate-600">
                Be the first to share what you think about this product.
              </p>
            </div>
          ) : (
            reviews.map((r) => {
              const isMine = (r.user?._id ?? r.user) === userId;
              const name = r.user?.name ?? "Customer";

              return (
                <article
                  key={r._id}
                  className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-emerald-950 text-sm font-semibold uppercase text-white">
                          {name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-emerald-950">
                          {name}
                          {isMine && (
                            <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-rose-500">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(r.createdAt)}
                        </p>
                      </div>
                    </div>

                    <StarsDisplay value={r.rating} />
                  </div>

                  <p className="mt-4 leading-relaxed text-slate-600">
                    {r.review}
                  </p>

                  {isMine && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(r)}
                        className="rounded-lg border-stone-300 bg-white text-slate-700 hover:bg-[#fbf8f3]"
                      >
                        <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(r._id)}
                        className="rounded-lg border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="rounded-2xl bg-[#fbf8f3]">
          <AlertDialogHeader>
            <AlertDialogTitle className=" text-emerald-950">
              Delete your review?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove your review. This action can't be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Yes, delete it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}