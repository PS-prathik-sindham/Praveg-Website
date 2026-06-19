"use client";

import { useEffect, useState } from "react";

const CARDS = ["Agent details", "Connect data source", "Publish"];

// slot 0 = front (largest, labelled), 1 = middle peek, 2 = back peek
const SLOTS = [
  { top: 0, w: 254, h: 63, z: 30, grad: "linear-gradient(180deg,#cfe2ff,#7fb0f5)", labelOp: 1 },
  { top: 23, w: 234, h: 58, z: 20, grad: "linear-gradient(180deg,#bcd7fb,#74a8f2)", labelOp: 0 },
  { top: 41, w: 204, h: 51, z: 10, grad: "linear-gradient(180deg,#a9ccf8,#6ba0ef)", labelOp: 0 },
];

export default function CardStack() {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFront((f) => (f + 1) % CARDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-[92px] w-[254px]">
      {CARDS.map((label, i) => {
        const slot = (i - front + CARDS.length) % CARDS.length;
        const s = SLOTS[slot];
        return (
          <div
            key={label}
            className="absolute left-1/2 flex items-center justify-center rounded-full font-semibold text-white"
            style={{
              top: s.top,
              width: s.w,
              height: s.h,
              zIndex: s.z,
              background: s.grad,
              transform: "translateX(-50%)",
              boxShadow: slot === 0 ? "0 8px 18px -6px rgba(60,130,246,0.45)" : "none",
              transition: "top 0.6s cubic-bezier(0.32,0.72,0,1), width 0.6s cubic-bezier(0.32,0.72,0,1), height 0.6s cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <span
              className="text-[16px] leading-none"
              style={{ opacity: s.labelOp, transition: "opacity 0.4s ease" }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
