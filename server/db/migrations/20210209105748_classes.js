
exports.up = function (knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").unsigned().primary();
    table.string("title").notNullable();
    table.string("code").notNullable();
    table.string("description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE classes_id_seq RESTART;");
  return knex.schema.dropTable("classes");
};
