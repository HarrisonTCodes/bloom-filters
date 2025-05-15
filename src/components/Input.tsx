export default function Input({
  ref,
  value,
  setValue,
  placeholder,
}: {
  ref: (el: HTMLInputElement | null) => void;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="w-44 rounded-md border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      ref={ref}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
}
