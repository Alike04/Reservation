const Table = require("../models/Table")
const Booking = require("../models/Booking")
const asyncErrorHandler = require("../utils/asyncErrorHandler")

const getAllTables = asyncErrorHandler(async (req, res) => {
  let tables = await Table.find().lean().exec();
  const time = req.query["time"];
  const date = req.query["date"];
  const bookings = await Booking.find({ date: date, time: time });
  tables.forEach(t => { t.available = true })

  bookings.forEach(b => {
    tables.forEach(t => {
      if (t._id.toString() == b.tableId.toString()) {
        t.available = false
      }
    })
  })
  return res.status(200).json({ tables: tables });
})

module.exports = { getAllTables }