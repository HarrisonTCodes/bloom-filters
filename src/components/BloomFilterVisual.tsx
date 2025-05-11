import { murmur3 } from 'murmurhash-js';
import { useRef, useState, useMemo } from 'react';
import Input from './Input';
import Line from './Line';

export default function BloomFilterVisual() {
  const bitCount = 64;
  const bitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bitValues, setBitValues] = useState(Array(bitCount).fill(false));

  const addItemRef = useRef<HTMLElement | null>(null);
  const checkItemRef = useRef<HTMLElement | null>(null);
  const [addItemValue, setAddItemValue] = useState('');
  const [checkItemValue, setCheckItemValue] = useState('');

  const hashes = Array.from({ length: 3 }).map(
    (_, index) => (value: string) => murmur3(value, index) % bitCount,
  );
  const addItemHashValues = useMemo(
    () => hashes.map((hash) => hash(addItemValue)),
    [hashes, addItemValue],
  );
  const checkItemHashValues = useMemo(
    () => hashes.map((hash) => hash(checkItemValue)),
    [hashes, checkItemValue],
  );
  const checkItemValueInSet = useMemo(
    () => checkItemValue && checkItemHashValues.every((value) => bitValues[value]),
    [checkItemValue, checkItemHashValues, bitValues],
  );

  function addItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBitValues((prev) => {
      if (!addItemValue) {
        return prev;
      }
      const newBitValues = [...prev];
      addItemHashValues.forEach((index) => (newBitValues[index] = true));
      setAddItemValue('');
      return newBitValues;
    });
  }

  return (
    <section className="flex w-full max-w-[800px] flex-col items-center gap-16 rounded-md border border-gray-400 bg-gray-100 p-8">
      {/* Add to bloom filter */}
      <form className="flex flex-col items-center gap-2 sm:flex-row" onSubmit={addItem}>
        <Input
          ref={(element) => {
            addItemRef.current = element;
          }}
          value={addItemValue}
          setValue={setAddItemValue}
        />
        <button
          className="w-44 rounded-md border border-gray-400 bg-gray-200 p-1 text-center transition hover:bg-gray-300"
          type="submit"
        >
          Add to set
        </button>
      </form>

      {/* Bit array */}
      <section className="grid w-fit grid-cols-8 gap-[1px] sm:grid-cols-16">
        {Array.from({ length: bitCount }).map((_, index) => (
          <div
            key={`bit-${index}`}
            ref={(element) => {
              bitRefs.current[index] = element;
            }}
            className={`h-8 w-8 ${addItemHashValues.includes(index) && addItemValue && 'border-3 border-blue-600'} ${checkItemHashValues.includes(index) && checkItemValue && 'border-3 border-red-600'} border border-black ${bitValues[index] ? 'bg-green-600' : 'bg-white'}`}
          />
        ))}
      </section>

      {/* Check if in bloom filter */}
      <section className="flex flex-col items-center gap-2 sm:flex-row">
        <Input
          ref={(element) => {
            checkItemRef.current = element;
          }}
          value={checkItemValue}
          setValue={setCheckItemValue}
        />
        <div
          className={`w-44 rounded-md border border-gray-400 p-1 text-center ${checkItemValueInSet ? 'bg-green-600' : 'bg-gray-200'}`}
        >
          {checkItemValueInSet ? 'Might be in set' : 'Definitely not in set'}
        </div>
      </section>

      {/* Lines */}
      {addItemValue &&
        addItemHashValues.map((value, index) => (
          <Line
            key={`add-line-${index}`}
            from={addItemRef.current!}
            to={bitRefs.current[value]!}
            fromYAlign="bottom"
            color="blue"
          />
        ))}
      {checkItemValue &&
        checkItemHashValues.map((value, index) => (
          <Line
            key={`add-line-${index}`}
            from={checkItemRef.current!}
            to={bitRefs.current[value]!}
            fromYAlign="top"
            color="red"
          />
        ))}
    </section>
  );
}
