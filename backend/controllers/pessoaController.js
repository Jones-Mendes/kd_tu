const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const caminhoArquivo = path.join(__dirname, "../data/pessoas.json");
const statusPermitidos = new Set(["desaparecido", "encontrado"]);
// Mapeia cidades conhecidas para o estado correspondente.
const cidadeParaEstado = {
  "Fortaleza": "Ceara",
  "Sao Paulo": "Sao Paulo",
  "Rio de Janeiro": "Rio de Janeiro",
  "Salvador": "Bahia",
  "Recife": "Pernambuco",
  "Belo Horizonte": "Minas Gerais",
  "Curitiba": "Parana",
  "Porto Alegre": "Rio Grande do Sul",
  "Belem": "Para",
  "Manaus": "Amazonas",
  "Brasilia": "Distrito Federal"
};


// Garante compatibilidade com dados antigos ao carregar o JSON.
const normalizarPessoa = (pessoa) => {
  let alterado = false;

  const estadoOrigem = pessoa.estado || pessoa.cidade || "";
  const estadoNormalizado = cidadeParaEstado[estadoOrigem] || estadoOrigem;

  if (pessoa.cidade) {
    delete pessoa.cidade;
    alterado = true;
  }

  if (estadoNormalizado && pessoa.estado !== estadoNormalizado) {
    pessoa.estado = estadoNormalizado;
    alterado = true;
  }

  if (!statusPermitidos.has(pessoa.status)) {
    pessoa.status = "desaparecido";
    alterado = true;
  }

  if (!pessoa.ultimaLocalizacao) {
    pessoa.ultimaLocalizacao = "Desconhecida";
    alterado = true;
  }

  if (pessoa.createdAt && pessoa.createdAt.includes(".")) {
    pessoa.createdAt = pessoa.createdAt.split(".")[0];
    alterado = true;
  }

  return alterado;
};

// Le o arquivo JSON e aplica normalizacoes necessárias.
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
  } catch (error) {
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
  const estadoNormalizado = cidadeParaEstado[estado || cidade] || estado || cidade;

  // 🔒 Validação dos campos obrigatorios.
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

  // 🔍 Filtro por nome
  if (nome) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // 🎯 Filtro por status
  if (status) {
    resultado = resultado.filter(p =>
      p.status === status
    );
  }

  res.json(resultado);
};

exports.atualizarStatus = (req, res) => {
  const pessoas = lerDados();
  const { id } = req.params;
  const { status } = req.body;

  const pessoa = pessoas.find(p => p.id === id);

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