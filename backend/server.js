const express = require("express");
const cors = require("cors");

const app = express();

// ==================== CORS CONFIGURADO PARA PRODUÇÃO ====================
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",   // Vercel vai enviar a URL real
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,                    // se você for usar cookies ou autenticação no futuro
  optionsSuccessStatus: 200             // ajuda com alguns navegadores antigos
}));
// =====================================================================

app.use(express.json());

// Rotas
const pessoasRoutes = require("./routes/pessoas");

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    mensagem: "API KD TU ativa",
    rotas: ["GET /pessoas", "POST /pessoas", "PUT /pessoas/:id"]
  });
});

app.use("/pessoas", pessoasRoutes);

// Porta dinâmica (obrigatório para Render)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`Frontend permitido: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});