import { useEffect, useState } from 'react';
import type { Alignment } from '../types';

function getElementOrigin(element: HTMLElement, xAlign?: Alignment, yAlign?: Alignment) {
  const alignToValue = { top: 0, middle: 0.5, bottom: 1 };
  return [
    element.getBoundingClientRect().x +
      element.getBoundingClientRect().width * alignToValue[xAlign ?? 'middle'],
    element.getBoundingClientRect().y +
      element.getBoundingClientRect().height * alignToValue[yAlign ?? 'middle'],
  ];
}

export default function Line({
  from,
  to,
  fromXAlign,
  fromYAlign,
  toXAlign,
  toYAlign,
  color,
}: {
  from: HTMLElement;
  to: HTMLElement;
  fromXAlign?: Alignment;
  fromYAlign?: Alignment;
  toXAlign?: Alignment;
  toYAlign?: Alignment;
  color: string;
}) {
  const [path, setPath] = useState('');

  function calculatePath() {
    const [x1, y1] = getElementOrigin(from, fromXAlign, fromYAlign);
    const [x2, y2] = getElementOrigin(to, toXAlign, toYAlign);

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
    <svg className="pointer-events-none absolute top-0 left-0 h-full w-full">
      <path d={path} stroke={color} fill="none" strokeWidth={1} />
    </svg>
  );
}
