exports.seed = function(knex, Promise) {
  return knex('cheese')
    .truncate()
    .then(function() {
      return knex('cheese').insert([
        { name: 'gorgonzola' },
        { name: 'fontina' },
        { name: 'muenster' },
        { name: 'pepperjack' },
        { name: 'brie' },
      ]);
    });
};
