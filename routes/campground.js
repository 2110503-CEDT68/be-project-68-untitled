const express = require("express");
const { getCampgrounds } = require("../controllers/campground");
const Campground = require("../models/Campground");

const router = express.Router();

router.get("/", getCampgrounds);

router.post("/", async (req, res) => {
  const campground = await Campground.create(req.body);
  res.status(201).json({
    success: true,
    data: campground
  });
});

module.exports = router; 