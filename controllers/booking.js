const Booking = require("../models/Booking");
exports.createBooking = async (req, res) => {
  try {
    if (req.body.nights > 3) {
      return res.status(400).json({
        success: false,
        message: "Cannot book more than 3 nights"
      });
    }

    req.body.user = req.user.id;

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("campground");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('campground', 'name location');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // อนุญาตเฉพาะเจ้าของ booking หรือ admin
    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // จำกัดไม่เกิน 3 คืน
    if (req.body.nights && req.body.nights > 3) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book more than 3 nights'
      });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (err) {
    next(err);
  }
};
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    next(err);
  }
};
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('campground', 'name location');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};