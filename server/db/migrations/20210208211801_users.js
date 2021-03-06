exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
    table.integer("student_number").notNullable();
    table.string("password").notNullable();
    table.string("email").unique().notNullable();
    table.boolean("is_teacher").defaultTo(false);
    table.boolean("has_recorded_typedna").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE users_id_seq RESTART;");
  return knex.schema.dropTable("users");
};
