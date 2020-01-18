
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('cpf').primary().unique()
    table.string('nome').notNull()
    table.date('nascimento').notNull()
    table.string('email').notNull()
    table.string('senha').notNull()
    table.boolean('admin').defaultTo().notNull()
    table.string('telefone')
    table.string('local')
  })
};

exports.down = (knex) => {
  return knex.schema.drogTable('users')
};
