import { PhaseFunction } from '../components';
import { upsertSpecializations } from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await upsertSpecializations();
    next();
  } catch (error) {
    next(error);
  }
};
