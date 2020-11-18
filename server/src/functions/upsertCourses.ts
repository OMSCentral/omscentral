import { courses } from '../../database/data';
import { Course } from '../models';

export const upsertCourses = async (): Promise<void> => {
  await Course.query().upsertGraph(courses, {
    insertMissing: true,
    noDelete: true,
  });
};
