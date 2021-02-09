exports.up = function (knex) {
  return knex.schema.createTable("exam_questions", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("exam_id").references('id').inTable('exams').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("question_number").notNullable();
    table.string("question").notNullable();
    table.integer("mark_value").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE exam_questions_id_seq RESTART;");

  return knex.schema.dropTable("exam_questions");
};
