package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/TANTA1-KW/sa67-project/config"
    "github.com/TANTA1-KW/sa67-project/controller/genders"
    "github.com/TANTA1-KW/sa67-project/controller/users"

    "github.com/TANTA1-KW/sa67-project/controller/Leave"
    "github.com/TANTA1-KW/sa67-project/middlewares"
)

const PORT = "8000"


func main() {


   // open connection database

   config.ConnectionDB()


   // Generate databases

   config.SetupDatabase()


   r := gin.Default()


   r.Use(CORSMiddleware())


   // Auth Route

   r.POST("/signup", users.SignUp)

   r.POST("/signin", users.SignIn)


   router := r.Group("/")

   {

       router.Use(middlewares.Authorizes())


       // User Route

       router.PUT("/user/:id", users.Update)

       router.GET("/users", users.GetAll)

       router.GET("/user/:id", users.Get)

       router.DELETE("/user/:id", users.Delete)


   }


   r.POST("/leave-request", Leave.AddLeaveRequest)
   r.GET("/leave-requests", Leave.GetAllLeaveRequests)
   r.GET("/leave-request/:id", Leave.GetLeaveRequest)
   r.PUT("/leave-request/:id", Leave.UpdateLeaveRequest)
   r.DELETE("/leave-request/:id", Leave.DeleteLeaveRequest)

   r.GET("/genders", genders.GetAll)



   r.GET("/", func(c *gin.Context) {

       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

   })


   // Run the server


   r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {

   return func(c *gin.Context) {

       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")


       if c.Request.Method == "OPTIONS" {

           c.AbortWithStatus(204)

           return

       }


       c.Next()

   }

}
