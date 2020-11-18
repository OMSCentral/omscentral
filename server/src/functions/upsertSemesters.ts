import { semesters } from '../../database/data';
import { Semester } from '../../src/models';

export const upsertSemesters = async (): Promise<void> => {
  await Semester.query().upsertGraph(semesters, {
    insertMissing: true,
    noDelete: true,
  });
};
