export default function Details({ children, title }) {
  return (
    <details className="bg-blue-500 bg-opacity-5 rounded-[.5em] w-full group">
      <summary class="text-blue-100 font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-between">
        <div className="text-lg">{title}</div>
        <svg
          class="w-4 h-4 transform group-open:rotate-180 transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 13.586L3.707 7.293a1 1 0 011.414-1.414L10 10.172l4.879-4.879a1 1 0 111.414 1.414L10 13.586z"
          />
        </svg>
      </summary>
      <div className="p-4 pt-0">{children}</div>
    </details>
  );
}
