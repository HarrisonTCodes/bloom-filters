import BloomFilterVisual from './components/BloomFilterVisual';

function App() {
  return (
    <main className="flex w-full flex-col items-center gap-4">
      {/* Information */}
      <section className="flex max-w-[800px] flex-col gap-4 px-2">
        <h1 className="mt-4 text-center text-3xl font-bold">Bloom Filters</h1>
        <hr />
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
          <code className="bg-gray-200 px-1">k = 3</code>. Add items with the input at the top, and
          check items against the filter with the input at the bottom, with a live representation of
          the bit array between them.
        </p>
      </section>

      <BloomFilterVisual />

      {/* Resources */}
      <section className="mb-8 flex w-full max-w-[800px] flex-col gap-4 px-2">
        <section>
          <h2 className="text-2xl font-medium">Resources</h2>
          <p>Inspirations and excellent resources on the fascinating topic of Bloom filters.</p>
        </section>
        <section className="flex flex-col">
          <a
            className="text-blue-800 hover:underline"
            href="https://www.youtube.com/watch?v=qZNJTh2NEiU"
          >
            mCoding - Bloom Filters
          </a>
          <a className="text-blue-800 hover:underline" href="https://samwho.dev/bloom-filters/">
            samwho - Bloom Filters
          </a>
          <a
            className="text-blue-800 hover:underline"
            href="https://ieeexplore.ieee.org/abstract/document/5751342"
          >
            Tarkoma, Rothenberg and Lagerspetz - Theory and Practice of Bloom Filters for
            Distributed Systems
          </a>
        </section>
      </section>
    </main>
  );
}

export default App;
