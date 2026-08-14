package main

import (
	"net/http"
)

func main() {

	http.HandleFunc("/tasks", getTarefas)
	http.ListenAndServe(":8080", nil)

}
