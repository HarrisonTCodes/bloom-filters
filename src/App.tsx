import { useMemo, useRef, useState } from 'react';
import Input from './components/Input';
import Line from './components/Line';
import { murmur3 } from 'murmurhash-js';

function App() {
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
    <main className="flex w-full flex-col items-center gap-4">
      {/* Information */}
      <section className="flex max-w-[800px] flex-col gap-4 px-2">
        <h1 className="mt-4 text-center text-3xl font-bold">Bloom Filters</h1>
        <section>
          <h2 className="text-2xl font-medium">What is a Bloom filter?</h2>
          <p>
            A Bloom filter (named after its inventor, Burton Howard Bloom) is a data structure which
            allows for efficient testing of whether an item is in a set or not. The data structure
            is probabilistic, meaning it trades perfect accuracy for efficiency.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium">How does it work?</h2>
          <p>
            A bit array of length <code className="bg-gray-200 px-1">m</code> is created with all
            0s. When adding an item to the set, it is hashed with{' '}
            <code className="bg-gray-200 px-1">k</code> hash functions, producing{' '}
            <code className="bg-gray-200 px-1">k</code> indices. The bits at each of these indices
            are then set to 1. When checking whether an item is in the set or not, those same hash
            functions are used and bits at the resulting indices are checked. If all those bits are
            1, then the item may be in the set. If at least 1 of the bits are 0, the item is
            definitely not in the set.
          </p>
        </section>
        <p>
          Below is an interactive Bloom filter you can add items to and check items against, with
          the parameters <code className="bg-gray-200 px-1">m = 64</code> and{' '}
          <code className="bg-gray-200">k = 3</code>
        </p>
      </section>

      {/* Visualisation */}
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
    </main>
  );
}

export default App;
