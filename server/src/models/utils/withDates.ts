import { Model, ModelOptions, QueryContext, Pojo } from 'objection';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withDates = (ModelToDecorate: typeof Model) =>
  class ModelWithDates extends ModelToDecorate {
    created!: number;
    updated!: number | null;

    static jsonSchema = {};

    $beforeInsert(queryContext: QueryContext) {
      super.$beforeInsert(queryContext);

      this.created = this.created || new Date().getTime();
    }

    $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
      super.$beforeUpdate(opt, queryContext);

      this.updated = this.updated || new Date().getTime();
    }

    $parseDatabaseJson(json: Pojo): Pojo {
      super.$parseDatabaseJson(json);
      return {
        ...json,
        created: Number(json.created),
        updated: json.updated && Number(json.updated),
      };
    }
  };
