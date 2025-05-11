import { useEffect, useState } from 'react';

function getElementOrigin(element: HTMLElement) {
  return [
    element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2,
    element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2,
  ];
}

export default function Line({ from, to }: { from: HTMLElement; to: HTMLElement }) {
  const [path, setPath] = useState('');

  function calculatePath() {
    const [x1, y1] = getElementOrigin(from);
    const [x2, y2] = getElementOrigin(to);

    const dx = Math.abs(x2 - x1) * 0.5;
    const isRight = x2 > x1;

    const cp1x = isRight ? x1 + dx : x1 - dx;
    const cp2x = isRight ? x2 - dx : x2 + dx;

    setPath(`M ${x1},${y1} C ${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`);
  }

  useEffect(() => {
    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, [from, to]);

  return (
    <svg className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
      <path d={path} stroke="blue" fill="none" strokeWidth={2} />
    </svg>
  );
}
