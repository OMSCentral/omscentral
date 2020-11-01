import { Domain } from './Domain';
import { CourseMetric } from './CourseMetric';

export class Course extends Domain {
  id!: string;
  department!: string;
  number!: string;
  name!: string;
  aliases!: Array<string>;
  foundational!: boolean;
  deprecated!: boolean;
  link!: string | null;

  metric!: CourseMetric;

  static tableName = 'omscentral_course';

  static relationMappings = {
    metric: {
      relation: Domain.HasOneRelation,
      modelClass: CourseMetric,
      join: {
        from: `${Course.tableName}.id`,
        to: `${CourseMetric.tableName}.course_id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: [
      'id',
      'department',
      'number',
      'name',
      'aliases',
      'foundational',
      'deprecated',
    ],
    properties: {
      id: { type: 'string' },
      department: { type: 'string' },
      number: { type: 'string' },
      name: { type: 'string' },
      aliases: { type: 'array', items: { type: 'string' } },
      foundational: { type: 'boolean' },
      deprecated: { type: 'boolean' },
      link: { type: ['string', 'null'] },
      metric: CourseMetric.jsonSchema,
    },
  };

  static eagerQuery = () => Course.query().withGraphFetched('[metric]');
}
