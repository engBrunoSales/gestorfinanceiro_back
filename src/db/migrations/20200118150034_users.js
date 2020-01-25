
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.string('cpf').primary().unique()
    table.string('nome').notNull()
    table.date('nascimento').notNull()
    table.string('email').notNull()
    table.string('senha').notNull()
    table.boolean('admin').defaultTo(false).notNull()
    table.string('telefone')
    table.string('local')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('users')
};
