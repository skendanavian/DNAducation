exports.up = function (knex) {
  return knex.schema.createTable("exam_attempts", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("section_students_id").references('id').inTable('section_students').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("exam_id").references('id').inTable('exams').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("marks_earned").nullable();
    table.integer("average_confidence").nullable();
    table.timestamp("time_submitted").nullable();
    table.timestamp("time_started").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};


exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE exam_attempts_id_seq RESTART;");
  return knex.schema.dropTable("exam_attempts");
};
