package main

type Tarefa struct {
	ID        int    `json:"id"`
	Titulo    string `json:"titulo"`
	Status    string `json:"status"`
	Descricao string `json:"descricao"`
}

var tarefas = []Tarefa{
	Tarefa{ID: 1, Titulo: "Tarefa1", Status: "a_fazer", Descricao: "Ajuste ao acesso da conta"},
	Tarefa{ID: 2, Titulo: "Tarefa2", Status: "em_progresso", Descricao: "Ajuste ao reset da senha"},
}
var proximoID int = 3
