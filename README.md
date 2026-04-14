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

Jones de Oliveira Mendes

## Agradecimentos

Agradeço a Deus por me conceder sabedoria, força e determinação para concluir este projeto. Foi através dessa jornada que pude perceber que sou capaz de realizar o impossível, pois o mesmo Espírito que ressuscitou Jesus dos mortos também habita em mim (Romanos 8:11).

Agradeço também às professoras **Fernanda Correa** e **Karynne Moreira**, e a toda a turma **Empower 5.0** do programa Vai na Web, por fazerem parte desta jornada.
