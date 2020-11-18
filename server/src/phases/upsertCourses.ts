import { PhaseFunction } from '../components';
import { upsertCourses } from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await upsertCourses();
    next();
  } catch (error) {
    next(error);
  }
};
