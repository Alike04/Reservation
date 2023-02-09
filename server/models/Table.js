const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
  number: Number,
  capacity: Number
})

module.exports = mongoose.model("table", tableSchema);