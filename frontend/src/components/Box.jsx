export default function Box({ children }) {
  return (
    <div className="container mt-4 flex flex-col gap-3 items-start rounded-[1rem] p-4 frosted-glass">
      {children}
    </div>
  );
}
