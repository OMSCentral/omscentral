export const semesterMeta = {
  season: [
    { value: 0, label: 'Unknown' },
    { value: 1, label: 'Spring' },
    { value: 2, label: 'Summer' },
    { value: 3, label: 'Fall' },
  ],
  translateSeason(value: number): string {
    return this.translate(value, 'season');
  },
  translate(value: number, key: 'season'): string {
    return this[key].find((other) => other.value === value)!.label;
  },
};
