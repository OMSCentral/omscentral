import { FilterCount, Option, SemesterOption } from 'src/core/types';
import { SemestersQuery } from 'src/graphql';

export const calculateFilterCount = (
  selectedFilterValues: string[] = [],
  filterOptions: Option[],
): FilterCount => {
  const filterCount: FilterCount = {
    selected: 0,
    total: filterOptions.length,
  };

  if (selectedFilterValues.length > 0) {
    filterOptions.forEach((option) => {
      if (selectedFilterValues.includes(option.value)) filterCount.selected++;
    });
  }

  return filterCount;
};

export const getSemesterFilterOptions = (
  semestersData?: SemestersQuery,
  courseSemesters?: string[],
): SemesterOption[] => {
  let semesterFilterOptions: SemesterOption[] =
    semestersData?.semesters?.map((semester) => ({
      value: semester.id,
      label: semester.name.split(' ')[0],
      year: semester.year,
      season: semester.season,
    })) || [];

  courseSemesters &&
    (semesterFilterOptions = semesterFilterOptions.filter((option) =>
      courseSemesters?.includes(option.value),
    ));

  return semesterFilterOptions;
};
