const db = require("../../databases");
const SiswaVal = require("../validations/siswaval");
const moment = require("moment");

module.exports = class SiswaController {
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 25, search = "", order = "asc" } = req.query;

      const siswa = await db("siswa as s")
        .leftJoin("kelas as k", "k.id", "s.kelas_id")
        .leftJoin("wali_murid as w", "w.id", "s.wali_murid_id")
        .select(
          "s.id",
          "s.nama_siswa",
          "s.nisn",
          "s.tempat_lahir",
          "s.tanggal_lahir",
          "s.jenis_kelamin",
          "s.no_telp",
          "s.alamat",
          "s.created_at",
          "s.updated_at",
          "k.nama_kelas",
          "w.nama_wali_murid",
          "w.no_telp_wali",
          "w.hubungan"
        )
        .limit(+limit)
        .offset(+limit * +page - +limit)
        .orderBy("created_at", order)
        .where("s.nama_siswa", "like", `%${search}%`);

      res.json({
        status: "success",
        message: "Get all data",
        siswa: siswa.map((d) => {
          return {
            id: d.id,
            nama_siswa: d.nama_siswa,
            nisn: d.nisn,
            tempat_lahir: d.tempat_lahir,
            tanggal_lahir: moment(d.tanggal_lahir).format("LL"),
            jenis_kelamin: d.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan",
            no_telp: d.no_telp,
            alamat: d.alamat,
            kelas: d.nama_kelas,
            wali_murid: {
              nama_wali_murid: d.nama_wali_murid,
              no_telp_wali: d.no_telp_wali,
              hubungan: d.hubungan,
            },
            created_at: d.created_at,
            updated_at: d.updated_at,
          };
        }),
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
  static async createSiswa(req, res) {
    try {
      const { error, value } = SiswaVal.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }
      const {
        nama_siswa,
        nisn,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        no_telp,
        alamat,
        kelas_id,
        nama_wali_murid,
        hubungan,
        no_telp_wali,
      } = value;
      await db.transaction(async function (trx) {
        //insert data wali
        const wm = await db("wali_murid")
          .transacting(trx)
          .insert({
            nama_wali_murid,
            hubungan,
            no_telp_wali,
          })
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        //insert data siswa
        await db("siswa")
          .transacting(trx)
          .insert({
            id: require("crypto").randomUUID(),
            wali_murid_id: wm,
            kelas_id,
            nisn,
            nama_siswa,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            jenis_kelamin,
            no_telp,
          })
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        trx.commit;
      });

      res.json({
        status: "success",
        message: "Siswa berhasil ditambahkan",
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
  static async getSiswa(req, res) {
    try {
      const { id } = req.params;
      const siswa = await db("siswa as s")
        .join("kelas as k", "s.kelas_id", "k.id")
        .join("wali_murid as w", "s.wali_murid_id", "w.id")
        .select(
          "s.id",
          "s.nama_siswa",
          "s.nisn",
          "s.tempat_lahir",
          "s.tanggal_lahir",
          "s.jenis_kelamin",
          "s.no_telp",
          "s.alamat",
          "s.created_at",
          "s.updated_at",
          "k.nama_kelas",
          "w.nama_wali_murid",
          "w.no_telp_wali",
          "w.hubungan"
        )
        .where("s.id", id)
        .first();
      if (!siswa) {
        return res.boom.notFound("Siswa tidak ditemukan");
      }
      res.json({
        status: "success",
        message: "Get data by id",
        data: {
          id: siswa.id,
          nama_siswa: siswa.nama_siswa,
          nisn: siswa.nisn,
          tempat_lahir: siswa.tempat_lahir,
          tanggal_lahir: moment(siswa.tanggal_lahir).format("LL"),
          jenis_kelamin: siswa.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan",
          no_telp: siswa.no_telp,
          alamat: siswa.alamat,
          kelas: siswa.nama_kelas,
          wali_murid: {
            nama_wali_murid: siswa.nama_wali_murid,
            no_telp_wali: siswa.no_telp_wali,
            hubungan: siswa.hubungan,
          },
          created_at: siswa.created_at,
          updated_at: siswa.updated_at,
        },
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
  static async updateSiswa(req, res) {
    try {
      const { id } = req.params;
      const s = await db("siswa").where({ id }).first();
      if (!s) {
        return res.boom.notFound("Siswa tidak ditemukan");
      }

      const { error, value } = SiswaVal.validate(req.body);
      if (error) {
        return res.boom.badData(error.message);
      }
      const {
        nama_siswa,
        nisn,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        no_telp,
        alamat,
        kelas_id,
        nama_wali_murid,
        hubungan,
        no_telp_wali,
      } = value;
      await db.transaction(async function (trx) {
        //update data wali
        await db("wali_murid")
          .transacting(trx)
          .update({
            nama_wali_murid,
            hubungan,
            no_telp_wali,
          })
          .where({ id: s.wali_murid_id })
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        //update data siswa
        await db("siswa")
          .transacting(trx)
          .update({
            kelas_id,
            nisn,
            nama_siswa,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            jenis_kelamin,
            no_telp,
          })
          .where({ id })
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        trx.commit;
      });

      res.json({
        status: "success",
        message: "Siswa berhasil diupdate",
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
  static async deleteSiswa(req, res) {
    try {
      const { id } = req.params;
      const s = await db("siswa").where({ id }).first();
      if (!s) {
        return res.boom.notFound("Siswa tidak ditemukan");
      }

      await db.transaction(async function (trx) {
        //delete data wali
        await db("wali_murid")
          .transacting(trx)
          .where({ id: s.wali_murid_id })
          .del()
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        //delete data siswa
        await db("siswa")
          .transacting(trx)
          .where({ id })
          .del()
          .catch((err) => {
            trx.rollback;
            return res.boom.badRequest(err.message);
          });
        trx.commit;
      });

      res.json({
        status: "success",
        message: "Siswa berhasil dihapus",
      });
    } catch (error) {
      return res.boom.badRequest(error.message);
    }
  }
};
