export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-[#141414] w-[480px] h-[320px] rounded-[28px] border border-neutral-200 dark:border-[#1f1f1f] shadow-xl dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)] relative ${className}`}>
      {children}
      {/* Vignette for dark mode */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
