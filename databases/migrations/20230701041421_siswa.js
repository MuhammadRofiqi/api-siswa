/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("siswa", (t) => {
    t.uuid("id").primary();
    t.string("nama_siswa", 50).notNullable();
    t.string("nisn", 10).notNullable();
    t.string("tempat_lahir", 50).notNullable();
    t.date("tanggal_lahir").notNullable();
    t.enum("jenis_kelamin", ["L", "P"]).notNullable();
    t.string("no_telp", 15).notNullable();
    t.string("alamat", 100).notNullable();
    t.integer("kelas_id").unsigned().notNullable();
    t.foreign("kelas_id").references("id").inTable("kelas").onDelete("CASCADE");
    t.integer("wali_murid_id").unsigned().notNullable();
    t.foreign("wali_murid_id").references("id").inTable("wali_murid").onDelete("CASCADE");
    t.timestamps(true, true);

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("siswa");
};
