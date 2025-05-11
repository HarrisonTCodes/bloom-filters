export default function Input({
  ref,
  value,
  setValue,
}: {
  ref: (el: HTMLInputElement | null) => void;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <input
      className="w-44 rounded-md border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      ref={ref}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
