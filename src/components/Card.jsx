export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#141414] w-[480px] h-[320px] rounded-[28px] border border-[#1f1f1f] shadow-[0_16px_40px_rgba(0,0,0,0.55)] relative ${className}`}>
      {children}
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
