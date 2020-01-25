
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mercados').del()
    .then(function () {
      // Inserts seed entries
      return knex('mercados').insert([
        {id: 1, nome: 'Banco'},
        {id: 2, nome: 'Varejo'},
        {id: 3, nome: 'Industria'}
      ]);
    });
};
