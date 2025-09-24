export default function Switch({ isOn, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 focus:outline-none ${
        isOn ? 'bg-green-500/80' : 'bg-neutral-300 dark:bg-neutral-700'
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform bg-white rounded-full transition-transform duration-300 ${
          isOn ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
