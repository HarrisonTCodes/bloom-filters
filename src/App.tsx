import { useRef } from 'react';
import Input from './components/Input';

function App() {
  const bitCount = 64;
  const bitRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <main>
      {/* Information */}
      <section>
        <h1 className="text-xl">Bloom Filters</h1>
      </section>

      {/* Visualisation */}
      <section>
        {/* Add to bloom filter */}
        <section>
          <Input />
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
          <Input />
        </section>
      </section>
    </main>
  );
}

export default App;
