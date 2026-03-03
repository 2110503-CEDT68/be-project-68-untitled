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

router.use(protect);

router.get("/", authorize("admin"), getAllBookings);

router.get("/me", getMyBookings);

router.post("/", createBooking);

router.put("/:id", updateBooking);

router.delete("/:id", deleteBooking);

module.exports = router;