package main

import (
	"net/http"
)

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("GET /tasks", getTarefas)
	mux.HandleFunc("POST /tasks", postTarefas)

	http.ListenAndServe(":8080", mux)

}
