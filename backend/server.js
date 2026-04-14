const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pessoasRoutes = require("./routes/pessoas");

app.use("/pessoas", pessoasRoutes);

app.listen(3001, () => {
  console.log(`Servidor rodando na porta http://localhost:3001`);
});