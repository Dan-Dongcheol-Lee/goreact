package main

import (
	"github.com/gin-gonic/gin"
	"time"
	"net/http"
)

func main() {

	type Message struct {
		Writer string `json:"writer"`
		Message string `json:"message"`
		CreatedDate time.Time `json:"createdDate"`
	}

	msgs := []Message {
		{ Writer: "Dan", Message: "Message 1", CreatedDate: time.Now() },
		{ Writer: "Fullbox", Message: "Message 2", CreatedDate: time.Now() },
	}

	router := gin.Default()

	router.GET("/messages", func(c *gin.Context) {
		c.IndentedJSON(http.StatusOK, gin.H{
			"status": "Ok",
			"messages": msgs,
		})
	})

	router.POST("/messages", func(c *gin.Context) {
		var msg Message
		c.BindJSON(&msg)
		msg.CreatedDate = time.Now()
		msgs = append(msgs, msg)
		c.IndentedJSON(http.StatusOK, gin.H{"status": "Ok"})
	})

	router.Static("/web", "./web")

	router.Run(":9080")
}
