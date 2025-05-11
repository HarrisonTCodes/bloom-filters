import Input from './components/Input';

function App() {
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
        <section>Bit array</section>

        {/* Check if in bloom filter */}
        <section>
          <Input />
        </section>
      </section>
    </main>
  );
}

export default App;
