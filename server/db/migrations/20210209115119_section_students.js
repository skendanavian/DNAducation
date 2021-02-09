exports.up = function (knex) {
  return knex.schema.createTable("section_students", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("user_id").notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("section_id").notNullable().references('id').inTable('sections').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};



exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE section_students_id_seq RESTART;");
  return knex.schema.dropTable("section_students");
};
