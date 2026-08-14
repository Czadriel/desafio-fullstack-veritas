package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func getTarefas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tarefas)

}

func postTarefas(w http.ResponseWriter, r *http.Request) {
	var novaTarefa Tarefa
	json.NewDecoder(r.Body).Decode(&novaTarefa)

	if novaTarefa.Titulo == "" {
		http.Error(w, "Dados Invalido", http.StatusBadRequest)
		return
	}

	switch novaTarefa.Status {
	case "":
		novaTarefa.Status = "a_fazer"
	case "a_fazer", "em_progresso", "concluido":
	default:
		http.Error(w, "Error invalido", http.StatusBadRequest)
		return
	}

	novaTarefa.ID = proximoID
	proximoID = proximoID + 1

	tarefas = append(tarefas, novaTarefa)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(novaTarefa)

}

func deleteTarefas(w http.ResponseWriter, r *http.Request) {
	idTexto := r.PathValue("id")
	id, err := strconv.Atoi(idTexto)
	if err != nil {
		http.Error(w, "Id inválido", http.StatusBadRequest)
		return
	}

	encontrado := false
	for indice, tarefa := range tarefas {
		if tarefa.ID == id {
			fmt.Println("Achei o indice: ", indice)
			encontrado = true
			tarefas = append(tarefas[:indice], tarefas[indice+1:]...)
			break
		}
	}
	if !encontrado {
		http.Error(w, "tarefa não encontrado", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
