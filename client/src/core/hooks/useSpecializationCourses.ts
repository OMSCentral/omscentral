import { useMemo } from 'react';

import { Specialization } from 'src/graphql';

const useSpecializationCourses = (
  specializations?: Specialization[],
): Map<string, Set<string>> =>
  useMemo(
    () =>
      new Map<string, Set<string>>(
        (specializations || []).map(({ id, requirements }) => [
          id,
          requirements.reduce(
            (ids, requirement) =>
              new Set<string>([...ids, ...requirement.courses]),
            new Set<string>(),
          ),
        ]),
      ),
    [specializations],
  );

export default useSpecializationCourses;
