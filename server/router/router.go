package router

import (
	"github.com/gorilla/mux"
	"github.com/sahithi/golang-react-todo/middleware"
)

func Router() *mux.Router {

	router := mux.NewRouter()
	router.HandleFunc("/api/tasks", middleware.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", middleware.CreateTask).Methods("POST")
	router.HandleFunc("/api/tasks/{id}", middleware.ToggleTaskCompleted).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/editTask/{id}", middleware.EditTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTasks", middleware.DeleteAllTasks).Methods("DELETE", "OPTIONS")
	return router
	
}
