const routes = require("express").Router();




routes.use("/v1/kelas", require("./kelas.route"));

routes.use("/v1/siswa", require("./siswa.route"));

module.exports = routes;
