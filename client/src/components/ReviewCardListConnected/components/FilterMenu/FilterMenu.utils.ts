import { FilterCount } from 'src/core/types';

export const getFilterMenuLabel = (
  filterName: string,
  filterCount: FilterCount,
): string => {
  return `${filterName}: ${
    filterCount.selected === 0 || filterCount.selected === filterCount.total
      ? 'All'
      : filterCount.selected
  }`;
};
