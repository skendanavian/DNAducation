
exports.up = function (knex) {
  return knex.schema.createTable("sections", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("class_id").notNullable().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer("teacher_user_id").notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};


exports.down = function (knex) {
  knex.raw("ALTER SEQUENCE sections_id_seq RESTART;");
  return knex.schema.dropTable("sections");
};
