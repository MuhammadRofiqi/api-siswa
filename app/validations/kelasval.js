const Joi = require("joi")

module.exports = Joi.object({
    nama_kelas: Joi.string().required().trim().message({
        "string.base": "Nama kelas harus berupa text",
        "string.empty": "Nama kelas tidak boleh kosong",
        "any.required": "Nama kelas harus diisi"
    })
});