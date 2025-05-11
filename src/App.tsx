import Input from './components/Input';

function App() {
  const bitCount = 64;

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
            <div key={`bit-${index}`} className="h-8 w-8 border border-black" />
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
