# Sistema de Registro de Pessoas Desaparecidas

## 📌 Titulo do Projeto
Sistema de Registro de Pessoas Desaparecidas
<img width="1094" height="733" alt="image" src="https://github.com/user-attachments/assets/e76a6cd6-ff06-44f0-bf18-10e3701d68b3" />
<img width="1093" height="731" alt="image" src="https://github.com/user-attachments/assets/6bf1ce08-ac17-4479-96d8-68c75818dd8e" />
<img width="1107" height="738" alt="image" src="https://github.com/user-attachments/assets/decc4f2b-d62c-42a0-ae47-78e902ea501e" />




## 🎓 Contexto
Este e um projeto final da turma Empower 5.0, ministrada pelas professoras Fernanda Correa e Karynne Moreira, do programa Vai na Web.

O Vai na Web e um programa de educacao digital focado na capacitacao gratuita em tecnologia para jovens e adultos.

## 🌍 Problema
Este projeto foi desenvolvido a partir do desafio sobre enchentes no Brasil.

Ao analisar o cenario, foi identificada a dificuldade no:
→ Registro de Pessoas Desaparecidas

## 💡 Solucao
Criar uma plataforma simples e eficiente para:

- Registrar pessoas desaparecidas
- Atualizar status (desaparecido/encontrado)
- Informar ultima localizacao
- Visualizar dados de forma clara

## ⚙️ Como funciona o sistema

- Backend (Node.js + Express):
  - API REST
  - Armazenamento em JSON
  - Criacao, listagem e atualizacao de status

- Frontend (React + Tailwind):
  - Interface moderna e responsiva
  - Cards de pessoas
  - Modal com detalhes
  - Hero informativo

## 🚀 Diferencial

- Interface simples e acessivel
- Foco em rapidez no cadastro
- Visualizacao clara das informacoes
- Projeto com potencial de impacto social real

## 📱 Responsividade

O sistema foi desenvolvido para funcionar em:

- Mobile 📱
- Tablet 📲
- Desktop 💻

## 🛠 Tecnologias utilizadas

- React
- Tailwind CSS
- Node.js
- Express
- UUID

## ▶️ Como rodar o projeto

```md
⚠️ Certifique-se de rodar o backend antes do frontend.

### Backend (porta 3001)

```bash
cd backend
npm install
npm run dev
```

### Frontend (porta 3000)

```bash
cd frontend
npm install
npm run start
```

## Deploy

### Antes de publicar

- O frontend precisa apontar para a URL publica da API usando a variavel VITE_API_URL.
- O backend precisa receber a URL do frontend em FRONTEND_URL.
- O backend usa o arquivo backend/data/pessoas.json como banco de dados. Em producao no Render, esse arquivo nao e uma estrategia confiavel de persistencia, porque o sistema de arquivos da instancia pode ser perdido em restart, redeploy ou troca de instancia.

### Frontend na Vercel

- Framework Preset: Vite
- Root Directory: frontend
- Build Command: npm run build
- Output Directory: dist
- Environment Variable: VITE_API_URL = URL publica do backend no Render

### Backend no Render

- Service Type: Web Service
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
- Environment Variable: FRONTEND_URL = URL publica do frontend na Vercel
- Environment Variable opcional: PORT sera fornecida pelo proprio Render

### Fluxo recomendado de deploy

1. Publique primeiro o backend no Render.
2. Copie a URL publica gerada no Render.
3. Configure essa URL no frontend como VITE_API_URL na Vercel.
4. Publique o frontend na Vercel.
5. Copie a URL final da Vercel.
6. Volte no Render e atualize FRONTEND_URL com a URL final do frontend.
7. Faça um novo deploy no Render ou use Save Changes and Deploy.

### Observacao importante sobre persistencia

Se voce mantiver o JSON local como banco em producao:

- os cadastros podem sumir apos novo deploy ou reinicio da aplicacao;
- o comportamento pode variar conforme a infraestrutura do Render;
- isso serve para demonstracao, nao para uso real.

Para producao de verdade, substitua o JSON por banco externo, como PostgreSQL, Supabase, Neon ou MongoDB Atlas.

## 📦 Endpoints da API

- GET /pessoas - lista pessoas
- POST /pessoas - cria pessoa
- PUT /pessoas/:id - atualiza status

Formato de pessoa:

```json
{
  "id": "string",
  "nome": "string",
  "idade": 0,
  "estado": "string",
  "foto": "string",
  "ultimaLocalizacao": "string",
  "status": "desaparecido" | "encontrado",
  "createdAt": "date"
}
```

## 📁 Estrutura do projeto

```
.
├─ backend/
│  ├─ controllers/
│  ├─ data/
│  ├─ routes/
│  ├─ server.js
│  └─ package.json
└─ frontend/
   ├─ src/
   ├─ index.html
   ├─ vite.config.js
   └─ package.json
```

## 👨‍💻 Autor

**Jones de Oliveira Mendes**

## Agradecimentos

Agradeço a Deus por me conceder sabedoria, força e determinação para concluir este projeto. Foi através dessa jornada que pude perceber que sou capaz de realizar o impossível, pois o mesmo Espírito que ressuscitou Jesus dos mortos também habita em mim (Romanos 8:11).

Agradeço também às professoras **Fernanda Correa** e **Karynne Moreira**, e a toda a turma **Empower 5.0** do programa Vai na Web, por fazerem parte desta jornada.
