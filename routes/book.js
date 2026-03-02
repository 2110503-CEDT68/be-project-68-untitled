const express = require("express");
const {
  createBooking,
  getMyBookings,
  updateBooking,
  deleteBooking,
  getAllBookings
} = require("../controllers/booking");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// ทุก route ต้อง login ก่อน
router.use(protect);

// Admin ดู booking ทั้งหมด
router.get("/", authorize("admin"), getAllBookings);

// User ดู booking ตัวเอง
router.get("/me", getMyBookings);

// สร้าง booking
router.post("/", createBooking);

// แก้ไข booking (owner หรือ admin)
router.put("/:id", updateBooking);

// ลบ booking (owner หรือ admin)
router.delete("/:id", deleteBooking);

module.exports = router;