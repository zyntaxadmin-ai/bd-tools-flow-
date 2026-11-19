"use client";
import type { InputHTMLAttributes } from "react";

/** Drop-in for <input type="range">: same props, but the part of the track up to the thumb is filled (styled in globals.css). */
export default function Range({ className = "", style, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 100);
  const v = Number(props.value ?? props.defaultValue ?? min);
  const pct = max > min ? Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100)) : 0;
  return <input {...props} type="range" className={`range ${className}`} style={{ ...style, ["--fill" as string]: `${pct}%` }} />;
}
