const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

// ==================== CORS CONFIGURADO PARA PRODUÇÃO ====================
app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origem nao permitida pelo CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
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
  console.log(`Frontend permitido: ${allowedOrigins.join(", ") || "origens padrao"}`);
});