# Mini Kanban de Tarefas — Desafio Fullstack Veritas

Aplicação fullstack de um Kanban simples, com três colunas fixas (**A Fazer**, **Em Progresso**, **Concluído**), desenvolvida com **React** no frontend e **Go** no backend, seguindo o desafio técnico da Veritas Consultoria Empresarial.

## Estrutura do repositório

```
/backend    → API REST em Go (main.go, handlers.go, models.go)
/frontend   → Aplicação React (Vite)
/docs       → Diagrama de User Flow
```

## Como rodar o projeto

### Pré-requisitos
- [Go](https://go.dev/dl/) instalado (testado na versão 1.26)
- [Node.js](https://nodejs.org/) instalado

### Backend

```bash
cd backend
go run .
```

O servidor sobe em `http://localhost:8080`, com os seguintes endpoints:

| Método | Rota          | Descrição                    |
|--------|---------------|-------------------------------|
| GET    | /tasks        | Lista todas as tarefas        |
| POST   | /tasks        | Cria uma nova tarefa          |
| PUT    | /tasks/{id}   | Atualiza título, descrição e status de uma tarefa |
| DELETE | /tasks/{id}   | Remove uma tarefa             |

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173` (ou na porta informada no terminal). **O backend precisa estar rodando** para o frontend carregar as tarefas corretamente.

## Decisões técnicas

- **Roteamento no backend**: utilizei o `http.ServeMux` nativo do Go (disponível a partir da versão 1.22), com padrões de rota como `"GET /tasks"` e `"PUT /tasks/{id}"`, evitando a necessidade de um roteador manual baseado em `switch r.Method` ou de bibliotecas externas.
- **Armazenamento em memória**: as tarefas são guardadas em um slice (`[]Tarefa`) e um contador incremental gera os IDs. Optei por essa abordagem por ser simples e suficiente para o escopo do desafio (não foi implementada persistência em arquivo/banco).
- **CORS**: implementado como um middleware próprio (sem bibliotecas externas), que envolve o `mux` e trata explicitamente requisições `OPTIONS` (preflight do navegador), liberando o acesso do frontend (`localhost:5173`) ao backend (`localhost:8080`).
- **Validações no backend**: título obrigatório e status restrito a `a_fazer`, `em_progresso` ou `concluido`, tanto na criação (POST) quanto na atualização (PUT).
- **Frontend com componente único**: dado o escopo do MVP, toda a interface está centralizada no componente `App.jsx`, usando `useState` para o estado das tarefas e dos campos do formulário, e `useEffect` para a busca inicial de dados.
- **Feedback visual**: estados de `carregando` e `erro` são tratados separadamente, exibindo uma mensagem de carregamento durante o `fetch` inicial e uma mensagem de erro caso a requisição falhe (por exemplo, backend fora do ar).

## Limitações conhecidas

- **Persistência**: como os dados ficam apenas em memória, todas as tarefas são perdidas quando o servidor Go é reiniciado.
- **Geração de ID**: o contador de próximo ID (`proximoID`) também é reiniciado junto com o servidor, o que pode gerar colisões de ID em cenários com múltiplas instâncias do backend rodando simultaneamente.
- **Edição de título/descrição**: o endpoint `PUT` já suporta atualizar título e descrição, mas o frontend atual só o utiliza para mudar o *status* da tarefa (mover entre colunas) — não há interface para editar o texto de uma tarefa já existente.
- **Sem testes automatizados** e **sem Docker** (itens de bônus não implementados).

## Melhorias futuras

- Persistir os dados em um banco de dados (ex: PostgreSQL) ou, no mínimo, em arquivo JSON, para não perder informações a cada reinício.
- Adicionar um formulário de edição de tarefas existentes no frontend.
- Implementar drag and drop para mover tarefas entre colunas.
- Adicionar testes automatizados no backend (Go) e no frontend (React).
- Containerizar a aplicação com Docker/Docker Compose para facilitar a execução.

## Documentação adicional

O diagrama de **User Flow**, mostrando as principais ações do usuário no sistema, está disponível em [`/docs/user-flow.png`](./docs/user-flow.png).
