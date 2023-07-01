/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("wali_murid", (t) => {
    t.increments("id").primary();
    t.string("nama_wali_murid", 50).notNullable();
    t.enum("hubungan", ["ayah", "ibu","saudara"]).notNullable();
    t.string("no_telp_wali", 15).notNullable();
    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("wali_murid");
};
