import { useEffect, useRef, useState } from "react";
import FlipDigit from "./FlipNumber";

export default function FlipCard({
  value,
  size = "lg",
  topLeft = "",
  topRight = "",
  bottomLeft = "",
  bottomRight = ""
}) {
  const v = Math.max(0, parseInt(value, 10) || 0);
  const [d1, d2] = v.toString().padStart(2, "0").split("");

  const sizes = {
    sm: { card: "w-[240px] h-[200px] rounded-3xl", font: 92 },
    md: { card: "w-[300px] h-[240px] rounded-3xl", font: 118 },
    lg: { card: "w-[360px] h-[280px] rounded-[28px]", font: 136 }, // mais encorpado
  }[size];

  return (
    <div className={`relative bg-[#141414] ${sizes.card}
      border border-[#1f1f1f] shadow-[0_16px_40px_rgba(0,0,0,0.55)] overflow-hidden select-none`}>

      {/* labels */}
      <div className="absolute top-3 left-4 text-neutral-400/85 text-sm">{topLeft}</div>
      <div className="absolute top-3 right-4 text-neutral-400/85 text-sm">{topRight}</div>

      {/* seam global com leve alto-relevo */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#1e1e1e]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-t from-black/30 to-transparent" />

      {/* dígitos */}
      <div className="h-full flex items-center justify-center gap-[0.18em] px-7">
        <FlipDigit digit={d1} sizePx={sizes.font} />
        <FlipDigit digit={d2} sizePx={sizes.font} />
      </div>

      {/* bottom labels */}
      <div className="absolute bottom-3 left-4 text-neutral-400/85 text-sm">{bottomLeft}</div>
      <div className="absolute bottom-3 right-4 text-neutral-400/85 text-sm">{bottomRight}</div>

      {/* vinheta leve nas bordas – dá profundidade */}
      <div className="pointer-events-none absolute inset-0 rounded-inherit
                      shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
    </div>
  );
}