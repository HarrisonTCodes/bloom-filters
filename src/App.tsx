import { useRef, useState } from 'react';
import Input from './components/Input';
import Line from './components/Line';

function App() {
  const bitCount = 64;
  const bitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addItemRef = useRef<HTMLElement | null>(null);
  const checkItemRef = useRef<HTMLElement | null>(null);
  const [addItemValue, setAddItemValue] = useState('');
  const [checkItemValue, setCheckItemValue] = useState('');

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
        <section className="grid w-fit grid-cols-16">
          {Array.from({ length: bitCount }).map((_, index) => (
            <div
              key={`bit-${index}`}
              ref={(element) => {
                bitRefs.current[index] = element;
              }}
              className="h-8 w-8 border border-black"
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

      {addItemValue && (
        <Line from={addItemRef.current!} to={bitRefs.current[parseInt(addItemValue)]!} />
      )}
    </main>
  );
}

export default App;
