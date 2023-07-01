const Joi = require("joi");

module.exports = Joi.object({
  nama_siswa: Joi.string().required().trim().messages({
    "string.base": "Nama siswa harus berupa text",
    "string.empty": "Nama siswa tidak boleh kosong",
    "any.required": "Nama siswa harus diisi",
  }),
  nisn: Joi.number().required().messages({
    "number.base": "NISN harus berupa angka",
    "number.empty": "NISN tidak boleh kosong",
    "number.max": "NISN tidak boleh lebih dari 10 digit",
  }),
  tempat_lahir: Joi.string().required().trim().messages({
    "string.base": "Tempat lahir harus berupa text",
    "string.empty": "Tempat lahir tidak boleh kosong",
    "any.required": "Tempat lahir harus diisi",
  }),
  tanggal_lahir: Joi.date().required().messages({
    "date.base": "Tanggal lahir harus berupa tanggal",
    "date.empty": "Tanggal lahir tidak boleh kosong",
    "any.required": "Tanggal lahir harus diisi",
  }),
  jenis_kelamin: Joi.string().valid("L" , "P").required().trim().messages({
    "string.empty": "Jenis kelamin tidak boleh kosong",
    "any.required": "Jenis kelamin harus diisi",
    "any.only": "Jenis kelamin harus berupa L atau P",
  }),
  no_telp: Joi.number().required().messages({
    "number.base": "No telp harus berupa angka",
    "number.empty": "No telp tidak boleh kosong",
    "number.max": "No telp tidak boleh lebih dari 15 digit",
  }),
  alamat: Joi.string().required().trim().messages({
    "string.empty": "Alamat tidak boleh kosong",
    "any.required": "Alamat harus diisi",
  }),
  kelas_id: Joi.number().required().messages({
    "number.base": "Kelas harus berupa angka",
    "number.empty": "Kelas tidak boleh kosong",
    "any.required": "Kelas harus diisi",
  }),
  nama_wali_murid: Joi.string().required().trim().messages({
    "string.base": "Nama wali murid harus berupa text",
    "string.empty": "Nama wali murid tidak boleh kosong",
    "any.required": "Nama wali murid harus diisi",
  }),
  hubungan: Joi.string().valid("ayah", "ibu","saudara").required().trim().messages({
    "string.empty": "Hubungan tidak boleh kosong",
    "any.required": "Hubungan harus diisi",
    "any.only": "Hubungan harus berupa ayah, ibu, atau saudara",
  }),
  no_telp_wali: Joi.number().required().messages({
    "number.base": "No telp wali harus berupa angka",
    "number.empty": "No telp wali tidak boleh kosong",
    "number.max": "No telp wali tidak boleh lebih dari 15 digit",
  })
});