package users

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/TANTA1-KW/sa67-project/config"
    "github.com/TANTA1-KW/sa67-project/entity"
)

// GetAll returns all users with their gender information
func GetAll(c *gin.Context) {
    var users []entity.Users

    db := config.DB()
    results := db.Preload("Gender").Find(&users)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, users)
}

// Get returns a single user by ID with gender information
func Get(c *gin.Context) {
    ID := c.Param("id")
    var user entity.Users

    db := config.DB()
    results := db.Preload("Gender").First(&user, ID)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    if user.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    c.JSON(http.StatusOK, user)
}

// Update updates a user by ID
func Update(c *gin.Context) {
    var user entity.Users
    UserID := c.Param("id")

    db := config.DB()
    result := db.First(&user, UserID)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    result = db.Save(&user)

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

// Delete removes a user by ID
func Delete(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()

    if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
