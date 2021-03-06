import { Option } from './Option';

export type SemesterOption = Option & {
  year: number;
  season: number;
};
