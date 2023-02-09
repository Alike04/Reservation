const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  date: { type: Date },
  time: {
    type: String, enum: ["9AM", "10AM", "11AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM"]
  },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  tableId: { type: mongoose.SchemaTypes.ObjectId, ref: "table" },
  status: { type: String, enum: ["active", "cancel"] }
})

module.exports = mongoose.model("booking", bookSchema)