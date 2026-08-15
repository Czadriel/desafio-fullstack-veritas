import { useState , useEffect } from "react";

function App() {

const [tarefas, setTarefas] = useState([]);
const [titulo, setTitulo] = useState("");
const [descricao, setDescricao] = useState("");


useEffect(() => {
fetch("http://localhost:8080/tasks")
.then(reposta => reposta.json())
.then(dados => setTarefas(dados));
}, []);

  return (
    <div>
      <h1>Mini Kanban</h1>
      <div className="coluna"><h2>A Fazer</h2>{tarefas.filter(tarefa => tarefa.status === "a_fazer").map(tarefa => (<div key = {tarefa.id}>{tarefa.titulo}</div>))}</div>
      <div className="coluna"><h2>Em Progresso</h2>{tarefas.filter(tarefa => tarefa.status === "em_progresso").map(tarefa => (<div key = {tarefa.id}>{tarefa.titulo}</div>))}</div>
      <div className="coluna"><h2>Concluido</h2>{tarefas.filter(tarefa => tarefa.status === "concluido").map(tarefa => (<div key = {tarefa.id}>{tarefa.titulo}</div>))}</div>
    </div>
  );
}

export default App;