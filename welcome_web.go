package main

import "log"
import "time"
import "net/http"
import "github.com/gin-gonic/gin"

func main() {

  router := gin.Default()

  router.GET("/welcome/:name", func(c *gin.Context) {
    name := c.Param("name")
    c.String(http.StatusOK, "Welcome %s", name)
  })

  execDelay := func (c *gin.Context) {
    time.Sleep(5 * time.Second)
    log.Println("Executed at " + time.Now().String() + " in path: " + c.Request.URL.Path)
  }

  router.GET("/go/async", func(c *gin.Context) {
    c_cp := c.Copy()
    go execDelay(c_cp)
    log.Println("Done /go/async")

  })
  router.Run(":9090")
}


