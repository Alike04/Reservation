const express = require("express")
const { login, register, authToken } = require("../controllers/authController");
const { getByUser, createBooking, deleteBooking } = require("../controllers/bookingController");
const { getAllTables } = require("../controllers/tableController");
const { auth } = require("../middleware/authMiddleware");
const Table = require("../models/Table");

const router = express.Router();

//table
router.get("/table", getAllTables)
router.get("/table-all", auth, async (req, res) => {
  const tables = await Table.find();
  res.status(200).json({ tables: tables })
})
//user
router.post("/login", login)
router.post("/register", register)
router.post("/auth", authToken)
//booking
router.delete("/book/:bookingId", auth, deleteBooking)
router.post("/book/create", auth, createBooking)
router.get("/book/:userId", auth, getByUser)

module.exports = router;