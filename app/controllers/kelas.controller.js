const db = require("../../databases");
const KelasVal = require("../validations/kelasval");

module.exports = class KelasController {
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 25, search = "", order = "asc" } = req.query;

      const kelas = await db("kelas")
        .select("id", "nama_kelas", "created_at", "updated_at")
        .limit(+limit)
        .offset(+limit * +page - +limit)
        .orderBy("created_at", order)
        .where("id", "like", `%${search}%`);
      
      res.json({
        status: "success",
        message: "Get all data",
        data: kelas,
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
  static async createkelas(req, res) {
    try {
      const { error, value } = KelasVal.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }
      const { nama_kelas } = value;
      const kelas = await db("kelas").insert({
        nama_kelas,
      });
      
      res.json({
        status: "success",
        message: "Kelas berhasil ditambahkan",
        data: kelas,
      });
    } catch (error) {
  (error);
    }
  }

  static async update(req, res) {
    try {
      //checking validted from body
      const { error, value } = KelasVal.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }
      const { id } = req.params;
      const namakelas = await db("kelas").where({ id }).first();
      if (!namakelas) {
        return boom.notFound("kelas not found");
      }

        //update data note
        await db("kelas")
          .where({ id })
          .update(value)

      return res.json({
        success: true,
        message: "kelas successfully Update",
      });
    } catch (error) {
        return res.boom.badRequest(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await db("kelas").where({ id }).first();

      if (!data) {
        return boom.notFound("kelas not found");
      } else {
        await db("kelas").where({ id }).del();

        return res.status(200).json({
          status: true,
          message: "Succes delete data kelas",
        });
      }
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
}