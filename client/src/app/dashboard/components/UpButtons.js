export default function UpButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                 transition-colors shadow-lg hover:shadow-xl border border-blue-500 
                 hover:border-blue-800 flex items-center space-x-2 font-bold"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
