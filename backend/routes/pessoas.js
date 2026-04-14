const express = require("express");
const router = express.Router();

const {
  criarPessoa,
  listarPessoas,
  atualizarStatus
} = require("../controllers/pessoaController");

router.post("/", criarPessoa);
router.get("/", listarPessoas);
router.put("/:id", atualizarStatus);

module.exports = router;