package goreact

import (
	"github.com/gin-gonic/gin"
	"time"
	"net/http"
	"sort"
)

type Message struct {
	Writer string `json:"writer"`
	Message string `json:"message"`
	CreatedDate time.Time `json:"createdDate"`
}

type Messages []Message

func (slice Messages) Len() int {
	return len(slice)
}

func (slice Messages) Less(i, j int) bool {
	return slice[i].CreatedDate.After(slice[j].CreatedDate)
}

func (slice Messages) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}

func init() {

	var msgs = Messages {
		{ Writer: "Dan", Message: "Message 1", CreatedDate: time.Now() },
		{ Writer: "Fullbox", Message: "Message 2", CreatedDate: time.Now() },
	}

	router := gin.Default()

	router.GET("/messages", func(c *gin.Context) {
		sort.Sort(msgs)
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

	http.Handle("/", router)
}
