const Booking = require("../models/Booking")
const ApiError = require("../utils/ApiError")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const Table = require("../models/Table")

const createBooking = asyncErrorHandler(async (req, res) => {
  const book = await Booking.create(req.body);
  return res.status(200).json({ book: book });
})

const getAll = asyncErrorHandler(async (req, res) => {
  const result = await Booking.find();
  return res.status(200).json({ book: result });
})
const getByUser = asyncErrorHandler(async (req, res) => {
  const userId = req.userData._id;
  const bookings = await Booking.find({ userId: userId }).lean().exec();
  // bookings.forEach(async b => b.table = await Table.findById(b.tableId))
  return res.status(200).json({ book: bookings })
})

module.exports = { createBooking, getByUser, getAll }
