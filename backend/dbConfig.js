const knex = require("knex");
const config = require("./knexfile");

const dbEnvironment = "development";

module.exports = knex(config[dbEnvironment]);
