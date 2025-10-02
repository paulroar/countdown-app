import PropTypes from 'prop-types';

export default function Switch({ isOn, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-9 w-16 items-center rounded-full border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
        isOn
          ? 'border-emerald-500 bg-emerald-500'
          : 'border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800'
      }`}
      aria-pressed={isOn}
    >
      <span
        className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform duration-300 ${
          isOn ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

Switch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
