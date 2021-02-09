exports.up = function (knex) {
  return knex.schema.createTable("exam_answers", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("exam_attempt_id").references('id').inTable('exam_attempts').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("exam_question_id").references('id').inTable('exam_questions').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
    table.string("answer").notNullable();
    table.string("mark");
    table.integer("confidence_level").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE exam_answers_id_seq RESTART;");
  return knex.schema.dropTable("exam_answers");
};
