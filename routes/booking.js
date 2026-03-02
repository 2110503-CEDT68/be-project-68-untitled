const express = require("express");
const {
  createBooking,
  getMyBookings,
  updateBooking,
  deleteBooking
} = require("../controllers/booking");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createBooking)
  .get(getMyBookings);

router.route("/:id")
  .put(updateBooking)
  .delete(deleteBooking);

router.get('/me', protect, getMyBookings);

router.put('/:id', protect, updateBooking);

router.delete('/:id', protect, deleteBooking);

module.exports = router;