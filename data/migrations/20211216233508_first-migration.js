
   
exports.up = function (knex) {
    return knex.schema.createTable("cheese", tbl => {
      tbl.increments();
  
      tbl.string("name", 100).unique().notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cheese");
  }; 
