package main

import(
	"fmt"
	"log"
	"net/http"
	"github.com/sahithi/golang-react-todo/router"
	"github.com/rs/cors"
)

func main(){
	r := router.Router()
	handler := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST","PUT","DELETE", "PATCH", "OPTIONS"},
	}).Handler(r)
	fmt.Println("starting the server on port 9000...")
	
	log.Fatal(http.ListenAndServe(":9000",handler))
}