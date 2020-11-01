import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { withDates } from './utils';
import { Program } from './Program';
import { Specialization } from './Specialization';
import { AuthProvider, Role } from '../enums';

export class User extends withDates(Domain) {
  id!: string;
  auth_provider!: AuthProvider;
  password_hash!: string | null;
  password_salt!: string | null;
  email!: string | null;
  name!: string | null;
  role!: Role;
  photo_url!: string | null;
  anonymous!: boolean;
  program_id!: string | null;
  specialization_id!: string | null;
  last_signed_in!: number;

  program!: Program | null;
  specialization!: Specialization | null;

  static tableName = 'omscentral_user';

  static relationMappings = {
    program: {
      relation: Domain.HasOneRelation,
      modelClass: Program,
      join: {
        from: `${User.tableName}.program_id`,
        to: `${Program.tableName}.id`,
      },
    },
    specialization: {
      relation: Domain.HasOneRelation,
      modelClass: Specialization,
      join: {
        from: `${User.tableName}.specialization_id`,
        to: `${Specialization.tableName}.id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: ['id', 'auth_provider', 'last_signed_in'],
    properties: {
      id: { type: 'string' },
      auth_provider: { type: 'string' },
      password_hash: { type: ['string', 'null'] },
      password_salt: { type: ['string', 'null'] },
      email: { type: ['string', 'null'] },
      name: { type: ['string', 'null'] },
      role: { type: 'string' },
      photo_url: { type: ['string', 'null'] },
      anonymous: { type: 'boolean' },
      program_id: { type: ['string', 'null'] },
      program: Program.jsonSchema,
      specialization_id: { type: ['string', 'null'] },
      specialization: Specialization.jsonSchema,
      last_signed_in: { type: 'number' },
      created: { type: 'number' },
      updated: { type: ['number', 'null'] },
    },
  };

  static eagerQuery = (): QueryBuilder<User> =>
    User.query().withGraphFetched(`[
      program,
      specialization.[program]
    ]`);
}
