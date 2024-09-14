package config

import (
	"fmt"

	"time"

	"github.com/TANTA1-KW/sa67-project/entity"

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)


var db *gorm.DB


func DB() *gorm.DB {

   return db

}


func ConnectionDB() {

   database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})

   if err != nil {

       panic("failed to connect database")

   }

   fmt.Println("connected database")

   db = database

}


func SetupDatabase() {


   db.AutoMigrate(

       &entity.Users{},

	    &entity.LeaveRequest{},

       &entity.Genders{},

   )


   GenderMale := entity.Genders{Gender: "Male"}

   GenderFemale := entity.Genders{Gender: "Female"}


   db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})

   db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})


   hashedPassword, _ := HashPassword("1234")

   BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
   AbDay, _ := time.Parse("2006-01-02", "2024-02-24")
   
   Leave := &entity.LeaveRequest{
       
      Day:  AbDay,

	   Description: "sick",
   }
   
   
   Users := &entity.Users{

       FirstName: "test",

       LastName:  "1234",
       
       Roles:     "Admin",
       
       Email:     "admin@gmail.com",

       Phone:     "0123456789",

       Age:       80,

       Password:  hashedPassword,

       BirthDay:  BirthDay,

       GenderID:  1,

   }


   db.FirstOrCreate(Users, &entity.Users{

       Email: "admin@gmail.com",

   })
   db.FirstOrCreate(&Leave, &entity.LeaveRequest{
      Day:  AbDay,
   })
}