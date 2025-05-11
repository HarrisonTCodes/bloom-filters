function getElementOrigin(element: HTMLElement) {
  return [
    element.getBoundingClientRect().x + element.getBoundingClientRect().height / 2,
    element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2,
  ];
}

export default function Line({ from, to }: { from: HTMLElement; to: HTMLElement }) {
  const [x1, y1] = getElementOrigin(from);
  const [x2, y2] = getElementOrigin(to);

  const dx = Math.abs(x2 - x1) * 0.5;
  const path = `M ${x1},${y1} C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;

  return (
    <svg className="absolute top-0 left-0 z-0 h-full w-full">
      <path d={path} stroke="blue" fill="none" strokeWidth={2} />
    </svg>
  );
}
