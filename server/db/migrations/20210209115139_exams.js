exports.up = function (knex) {
  return knex.schema.createTable("exams", (table) => {
    table.increments("id").unsigned().primary();
    table
      .integer("section_id")
      .references("id")
      .inTable("sections")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.integer("total_submissions").defaultTo(0);
    table.timestamp("due_time").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE exams_id_seq RESTART;");
  return knex.schema.dropTable("exams");
};
