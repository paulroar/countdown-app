import PropTypes from 'prop-types';

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[28px] border border-slate-200 bg-white text-slate-800 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-[#141414] dark:text-slate-100 dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${className}`}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

