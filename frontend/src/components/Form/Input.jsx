export default function ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  ...rest
}) {
  if (!id) id = "input-" + Math.random().toString(36).substr(2, 9);
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
