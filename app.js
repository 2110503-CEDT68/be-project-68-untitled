const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Campground Booking API Running...");
});

module.exports = app;

const authRoutes = require("./routes/auth");

app.use("/api/v1/auth", authRoutes);

const { protect } = require("./middleware/auth");

app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are logged in",
    user: req.user
  });
});
const campgroundRoutes = require("./routes/campground");

app.use("/api/v1/campgrounds", campgroundRoutes);
const bookingRoutes = require("./routes/booking");
app.use("/api/v1/bookings", bookingRoutes);