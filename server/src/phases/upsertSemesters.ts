import { PhaseFunction } from '../components';
import { upsertSemesters } from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await upsertSemesters();
    next();
  } catch (error) {
    next(error);
  }
};
