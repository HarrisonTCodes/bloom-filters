import { useMemo, useRef, useState } from 'react';
import Input from './components/Input';
import Line from './components/Line';
import { murmur3 } from 'murmurhash-js';

function App() {
  const bitCount = 64;
  const bitRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  return (
    <main>
      {/* Information */}
      <section>
        <h1 className="text-xl">Bloom Filters</h1>
      </section>

      {/* Visualisation */}
      <section className="flex w-full flex-col items-center gap-32">
        {/* Add to bloom filter */}
        <section>
          <Input
            ref={(element) => {
              addItemRef.current = element;
            }}
            value={addItemValue}
            setValue={setAddItemValue}
          />
        </section>

        {/* Bit array */}
        <section className="grid w-fit grid-cols-16 gap-[1px]">
          {Array.from({ length: bitCount }).map((_, index) => (
            <div
              key={`bit-${index}`}
              ref={(element) => {
                bitRefs.current[index] = element;
              }}
              className={`h-8 w-8 ${addItemHashValues.includes(index) && addItemValue && 'border-3 border-blue-600'} ${checkItemHashValues.includes(index) && checkItemValue && 'border-3 border-red-600'} border border-black`}
            />
          ))}
        </section>

        {/* Check if in bloom filter */}
        <section>
          <Input
            ref={(element) => {
              checkItemRef.current = element;
            }}
            value={checkItemValue}
            setValue={setCheckItemValue}
          />
        </section>
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
    </main>
  );
}

export default App;
