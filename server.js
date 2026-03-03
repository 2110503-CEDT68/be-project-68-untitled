const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Campground Booking API Running...");
});

// Import routes
const authRoutes = require("./routes/auth");
const campgroundRoutes = require("./routes/campground");
const bookingRoutes = require("./routes/booking");
const { protect } = require("./middleware/auth");

// Use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/campgrounds", campgroundRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// Example protected route
app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are logged in",
    user: req.user
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});