const routes = require("express").Router();
const controller = require("../controllers/kelas.controller");

routes.get("/", controller.getAll);
routes.post("/", controller.createkelas);
routes.put("/:id", controller.update);
routes.delete("/:id", controller.delete);

module.exports = routes;
