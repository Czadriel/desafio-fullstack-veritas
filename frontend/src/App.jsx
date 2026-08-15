import { useState, useEffect } from "react";

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then(reposta => reposta.json())
      .then(dados => setTarefas(dados));
  }, []);

  async function criarTarefa() {
    const resposta = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: titulo, descricao: descricao })
    });
    const tarefaCriada = await resposta.json();
    setTarefas([...tarefas, tarefaCriada]);
    setTitulo("");
    setDescricao("");
  }

  async function excluirTarefa(id) {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    });
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }

  return (
    <div>
      <h1>Mini Kanban</h1>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da tarefa"
      />

      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição da tarefa"
      />

      <button onClick={criarTarefa}>AdicionarTarefa</button>

      <div className="coluna">
        <h2>A Fazer</h2>
        {tarefas.filter(tarefa => tarefa.status === "a_fazer").map(tarefa => (
          <div key={tarefa.id}>
            {tarefa.titulo}
            <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </div>
        ))}
      </div>

      <div className="coluna">
        <h2>Em Progresso</h2>
        {tarefas.filter(tarefa => tarefa.status === "em_progresso").map(tarefa => (
          <div key={tarefa.id}>
            {tarefa.titulo}
            <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </div>
        ))}
      </div>

      <div className="coluna">
        <h2>Concluido</h2>
        {tarefas.filter(tarefa => tarefa.status === "concluido").map(tarefa => (
          <div key={tarefa.id}>
            {tarefa.titulo}
            <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;