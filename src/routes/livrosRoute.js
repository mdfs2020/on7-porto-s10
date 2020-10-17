const express = require("express");
const router = express.Router();
const controller = require("../controller/livrosController");

router.get("/", controller.getAll);
router.get("/livros", controller.getAll);
router.get("/:id", controller.getById);
router.get("/categoria/:categoria", controller.getByCategoria);
router.post("/", controller.postLivro);
router.delete("/:id", controller.deleteLivro);
router.put("/:id", controller.putLivro);
router.patch("/:id", controller.patchLivro);

module.exports = router;