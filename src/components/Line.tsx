import { useEffect, useState } from 'react';

type Coordinate = {
  x: number;
  y: number;
};

function getElementPosition(element: HTMLElement, xAlign: number = 0.5, yAlign: number = 0.5) {
  const rect = element.getBoundingClientRect();

  return [rect.x + rect.width * xAlign, rect.y + rect.height * yAlign];
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
  fromXAlign?: number;
  fromYAlign?: number;
  toXAlign?: number;
  toYAlign?: number;
  color: string;
}) {
  const [path, setPath] = useState('');
  const [maxY, setMaxY] = useState(0);
  const [circleCoordinates, setCircleCoordinates] = useState<Coordinate | undefined>();

  function calculateGeometry() {
    const [originX1, originY1] = getElementPosition(from, fromXAlign, fromYAlign);
    const [originX2, originY2] = getElementPosition(to, toXAlign, toYAlign);

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const x1 = originX1 + scrollX;
    const y1 = originY1 + scrollY;
    const x2 = originX2 + scrollX;
    const y2 = originY2 + scrollY;

    const dx = Math.abs(x2 - x1) * 0.5;
    const isRight = x2 > x1;

    const cp1x = isRight ? x1 + dx : x1 - dx;
    const cp2x = isRight ? x2 - dx : x2 + dx;

    setPath(`M ${x1},${y1} C ${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`);
    setCircleCoordinates({ x: x2, y: y2 });
    setMaxY(y1 > y2 ? y1 : y2);
  }

  useEffect(() => {
    calculateGeometry();

    window.addEventListener('resize', calculateGeometry);
    window.addEventListener('scroll', calculateGeometry);

    return () => {
      window.removeEventListener('resize', calculateGeometry);
      window.removeEventListener('scroll', calculateGeometry);
    };
  }, [from, to]);

  return (
    <svg
      className="pointer-events-none absolute top-0 left-0 w-full"
      style={{ height: `${maxY + 6}px` }}
    >
      <path d={path} stroke={color} fill="none" strokeWidth={2} />
      {circleCoordinates && (
        <circle cx={circleCoordinates.x} cy={circleCoordinates.y} r={6} fill={color} />
      )}
    </svg>
  );
}
