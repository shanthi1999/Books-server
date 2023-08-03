exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
      table.increments('id').primary();
      table.string('thumbnailSrc');
      table.string('title');
      table.decimal('discount', 10, 2);      
      table.string('price');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('books');
  };
  