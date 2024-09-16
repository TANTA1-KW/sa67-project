package users

import (
    "errors"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"

    "github.com/TANTA1-KW/sa67-project/config"
    "github.com/TANTA1-KW/sa67-project/entity"
    "github.com/TANTA1-KW/sa67-project/services"
)

type (
    Authen struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }

    signUp struct {
        FirstName string    `json:"first_name"`
        LastName  string    `json:"last_name"`
        Roles     string    `json:"role"`
        Email     string    `json:"email"`
        Phone     string    `json:"phone"`
        Age       uint8     `json:"age"`
        Password  string    `json:"password"`
        BirthDay  time.Time `json:"birthday"`
        Address   string    `json:"address"`
        GenderID  uint      `json:"gender_id"`
    }
)

func SignUp(c *gin.Context) {
    var payload signUp

    // Bind JSON payload to the struct
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    var userCheck entity.Users

    // Check if the user with the provided email already exists
    result := db.Where("email = ?", payload.Email).First(&userCheck)
    if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
        // If there's a database error other than "record not found"
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    if userCheck.ID != 0 {
        // If the user with the provided email already exists
        c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
        return
    }

    // Hash the user's password
    hashedPassword, _ := config.HashPassword(payload.Password)

    // Create a new user
    newUser := entity.Users{
        FirstName: payload.FirstName,
        LastName:  payload.LastName,
        Roles:     payload.Roles,
        Email:     payload.Email,
        Phone:     payload.Phone,
        Age:       payload.Age,
        Password:  hashedPassword,
        BirthDay:  payload.BirthDay,
        Address:   payload.Address,
        GenderID:  payload.GenderID,
    }

    // Save the user to the database
    if err := db.Create(&newUser).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})
}

func SignIn(c *gin.Context) {
    var payload Authen
    var user entity.Users

    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Find user by email
    if err := config.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Check the password
    err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
        return
    }

    jwtWrapper := services.JwtWrapper{
        SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
        Issuer:          "AuthService",
        ExpirationHours: 24,
    }

    signedToken, err := jwtWrapper.GenerateToken(user.Email)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": user.ID})
}
