const routes = require("express").Router();
const controller = require("../controllers/siswa.controller");

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSiswa);
routes.post("/", controller.createSiswa);
routes.put("/:id", controller.updateSiswa);
routes.delete("/:id", controller.deleteSiswa);

module.exports = routes;