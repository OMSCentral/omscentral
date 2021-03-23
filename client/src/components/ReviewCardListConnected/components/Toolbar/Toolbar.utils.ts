import { FilterCount, Option } from 'src/core/types';

export const calculateFilterCount = (
  filters: string[] = [],
  filterOptions: Option[],
): FilterCount => {
  const filterCount: FilterCount = {
    selected: 0,
    total: filterOptions.length,
  };

  if (filters.length > 0) {
    filterOptions.forEach((option) => {
      if (filters.includes(option.value)) filterCount.selected++;
    });
  }

  return filterCount;
};
