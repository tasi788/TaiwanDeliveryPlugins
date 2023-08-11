export default function Box({ children }) {
  return (
    <div className="container mt-4 flex flex-col gap-3 items-start rounded-[1rem] shadow-md p-4 border border-gray-700 bg-gray-900 bg-opacity-30">
      {children}
    </div>
  );
}
