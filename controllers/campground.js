const Campground = require("../models/Campground");

exports.getCampgrounds = async (req, res) => {
  try {
    const campgrounds = await Campground.find();

    res.status(200).json({
      success: true,
      count: campgrounds.length,
      data: campgrounds
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};