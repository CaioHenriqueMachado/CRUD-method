
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
      table.string('id').primary();
      table.string('login').notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.boolean('blocked').notNullable().defaultTo(false);
      table.boolean('admin').notNullable().defaultTo(false);
      table.string('created_at').notNullable();
      table.string('updated_at').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
  
};
