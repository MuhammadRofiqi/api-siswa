// Update with your config settings.
require("dotenv").config();

const{MYSQL_HOST,MYSQL_PORT,MYSQL_NAME,MYSQL_USER,MYSQL_PASS} = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "mysql2",
    connection: {
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_NAME
    },
    migrations: {
      directory: "./databases/migrations"
    },
    seeds: {
      directory: "./databases/seeds"
    }


  },

};
