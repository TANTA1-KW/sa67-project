package entity

import (
    "time"
    "gorm.io/gorm"
)

type Users struct {
    gorm.Model
    FirstName  string    `json:"first_name"`
    LastName   string    `json:"last_name"`
    Roles      string    `json:"roles"`
    Email      string    `json:"email"`
    Phone      string    `json:"phone"`
    Age        uint8     `json:"age"`
    Password   string    `json:"-"`
    BirthDay   time.Time `json:"birthday"`
    GenderID   uint      `json:"gender_id"`
    Gender    *Genders   `gorm:"foreignKey:GenderID" json:"gender"`  // ชื่อ ForeignKey ที่ตรงกับฟิลด์
    LeaveRequestID    uint      `json:"leaverequest_id"`
    LeaveRequest      *LeaveRequest    `gorm:"foreignKey:LeaveRequestID" json:"leaverequest"`     // ชื่อ ForeignKey ที่ตรงกับฟิลด์
}
