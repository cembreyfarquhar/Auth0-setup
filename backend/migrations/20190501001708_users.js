exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("username", 64);
    users.string("catchphrase", 128);
    users.string("first_name", 64);
    users.string("auth_id", 1000).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.raw("DROP TABLE IF EXISTS users CASCADE");
};
