import React from "react";

export default function AuthHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-green-400">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-4xl font-bold leading-tight text-emerald-950 md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-md text-lg text-slate-600">{description}</p>
      )}
    </div>
  );
}