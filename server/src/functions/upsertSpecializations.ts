import { specializations } from '../../database/data';
import { Specialization } from '../models';

export const upsertSpecializations = async (): Promise<void> => {
  await Specialization.query().upsertGraph(specializations, {
    insertMissing: true,
    noDelete: true,
  });
};
