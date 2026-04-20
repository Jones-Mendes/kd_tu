const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const caminhoArquivo = path.join(__dirname, "../data/pessoas.json");
const statusPermitidos = new Set(["desaparecido", "encontrado"]);
const cidadeParaEstado = {
  fortaleza: "Ceara",
  salvador: "Bahia",
  brasilia: "Distrito Federal",
  curitiba: "Parana",
  teresina: "Piaui",
  "sao paulo": "Sao Paulo",
  "rio de janeiro": "Rio de Janeiro",
  "belo horizonte": "Minas Gerais",
  "porto alegre": "Rio Grande do Sul"
};

const normalizarTexto = (valor) => {
  if (typeof valor !== "string") {
    return "";
  }

  return valor
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
};

const formatarNomeProprio = (valor) =>
  valor
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase())
    .join(" ");

const normalizarEstado = (valor) => {
  const textoNormalizado = normalizarTexto(valor);
  if (!textoNormalizado) {
    return "";
  }

  const chave = textoNormalizado.toLowerCase();
  return cidadeParaEstado[chave] || formatarNomeProprio(textoNormalizado);
};

// Garante compatibilidade com dados antigos ao carregar o JSON.
const normalizarPessoa = (pessoa) => {
  let alterado = false;

  const estadoOrigem = pessoa.estado || pessoa.cidade || "";
  const estadoNormalizado = normalizarEstado(estadoOrigem);

  // Mantem apenas o campo estado no modelo atual.
  if (pessoa.cidade) {
    delete pessoa.cidade;
    alterado = true;
  }

  if (estadoNormalizado && pessoa.estado !== estadoNormalizado) {
    pessoa.estado = estadoNormalizado;
    alterado = true;
  }

  // Corrige status invalidos para o default.
  if (!statusPermitidos.has(pessoa.status)) {
    pessoa.status = "desaparecido";
    alterado = true;
  }

  // Evita campos obrigatorios vazios em dados legados.
  if (!pessoa.ultimaLocalizacao) {
    pessoa.ultimaLocalizacao = "Desconhecida";
    alterado = true;
  }

  // Remove milissegundos para padrao de exibicao.
  if (pessoa.createdAt && pessoa.createdAt.includes(".")) {
    pessoa.createdAt = pessoa.createdAt.split(".")[0];
    alterado = true;
  }

  return alterado;
};

// Le o arquivo JSON e aplica normalizacoes necessarias.
const lerDados = () => {
  try {
    const dados = fs.readFileSync(caminhoArquivo, "utf-8");
    const pessoas = dados ? JSON.parse(dados) : [];
    let precisaSalvar = false;

    pessoas.forEach((pessoa) => {
      if (normalizarPessoa(pessoa)) {
        precisaSalvar = true;
      }
    });

    if (precisaSalvar) {
      salvarDados(pessoas);
    }

    return pessoas;
  } catch {
    return [];
  }
};

// Persiste o JSON em disco com formatacao legivel.
const salvarDados = (dados) => {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2));
};

exports.criarPessoa = (req, res) => {
  const pessoas = lerDados();

  const { nome, idade, estado, cidade, foto, ultimaLocalizacao } = req.body;
  const estadoNormalizado = normalizarEstado(estado || cidade);

  // Valida campos obrigatorios antes de persistir.
  if (!nome || !idade || !estadoNormalizado) {
    return res.status(400).json({
      erro: "Nome, idade e estado são obrigatórios"
    });
  }

  const novaPessoa = {
    id: uuidv4(),
    nome,
    idade,
    estado: estadoNormalizado,
    foto: foto || "https://via.placeholder.com/150",
    ultimaLocalizacao: ultimaLocalizacao || "Desconhecida",
    status: "desaparecido",
    createdAt: new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    })
  };

  pessoas.push(novaPessoa);
  salvarDados(pessoas);

  res.status(201).json(novaPessoa);
};

exports.listarPessoas = (req, res) => {
  const pessoas = lerDados();

  const { nome, status } = req.query;

  let resultado = pessoas;

  // Filtro por nome (case-insensitive).
  if (nome) {
    resultado = resultado.filter((p) =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // Filtro por status.
  if (status) {
    resultado = resultado.filter((p) => p.status === status);
  }

  res.json(resultado);
};

exports.atualizarStatus = (req, res) => {
  const pessoas = lerDados();
  const { id } = req.params;
  const { status } = req.body;

  const pessoa = pessoas.find((p) => p.id === id);

  if (!pessoa) {
    return res.status(404).json({ erro: "Pessoa não encontrada" });
  }

  // Valida o status para evitar valores fora do permitido.
  if (!status) {
    return res.status(400).json({ erro: "Status é obrigatório" });
  }

  if (!statusPermitidos.has(status)) {
    return res.status(400).json({ erro: "Status invalido" });
  }

  pessoa.status = status;

  salvarDados(pessoas);

  res.json(pessoa);
};