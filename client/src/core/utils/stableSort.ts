export default function stableSort<T>(
  array: T[],
  cmp: (a: T, b: T) => number,
): T[] {
  const stable: [T, number][] = array.map((el, index) => [el, index]);

  stable.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stable.map((el) => el[0]);
}
