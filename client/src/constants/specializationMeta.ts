export const specializationMeta = {
  type: [
    { value: 'core', label: 'Core' },
    { value: 'core-flex', label: 'Flexible Core' },
    { value: 'elective', label: 'Elective' },
    { value: 'elective-stats', label: 'Statistics Elective' },
    { value: 'elective-ops', label: 'Operations Research Elective' },
    { value: 'elective-extra', label: 'Additional Elective' },
    { value: 'elective-track', label: 'Track Elective' },
    { value: 'required', label: 'Required' },
    { value: 'practicum', label: 'Practicum' },
  ],
  translateType(value: string): string {
    return this.translate(value, 'type');
  },
  translate(value: string, key: 'type'): string {
    return this[key].find((other) => other.value === value)!.label;
  },
};
