import Knex from 'knex';

import { addColumn, dropColumn } from '../utils';
import { Course } from '../../src/models';
import { courses } from '../data';

exports.up = async (knex: Knex) => {
  await addColumn(knex, Course.tableName, 'aliases', (tb) => {
    tb.jsonb('aliases').notNullable().defaultTo([]);
  });

  await Course.query(knex).upsertGraph(courses, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await dropColumn(knex, Course.tableName, 'aliases');
};
