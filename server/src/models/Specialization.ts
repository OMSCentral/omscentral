import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { Program } from './Program';

export class Specialization extends Domain {
  id!: string;
  program_id!: string;
  name!: string;
  requirements!: {
    type:
      | 'core'
      | 'core-flex'
      | 'elective'
      | 'elective-stats'
      | 'elective-ops'
      | 'elective-extra'
      | 'elective-track'
      | 'required'
      | 'practicum';
    count: number;
    courses: string[];
  }[];

  program!: Program;

  static tableName = 'omscentral_specialization';

  static relationMappings = {
    program: {
      relation: Domain.BelongsToOneRelation,
      modelClass: Program,
      join: {
        from: `${Specialization.tableName}.program_id`,
        to: `${Program.tableName}.id`,
      },
    },
  };

  static jsonAttributes = ['requirements'];

  static jsonSchema = {
    type: 'object',
    required: ['id', 'name', 'requirements'],
    properties: {
      id: { type: 'string' },
      program_id: { type: 'string' },
      program: Program.jsonSchema,
      name: { type: 'string' },
      requirements: {
        type: 'array',
        items: {
          type: 'object',
          required: ['type', 'count', 'courses'],
          properties: {
            type: { type: 'string' },
            count: { type: 'integer' },
            courses: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  };

  static eagerQuery = (): QueryBuilder<Specialization> =>
    Specialization.query().withGraphFetched('[program]');
}
