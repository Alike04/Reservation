const express = require("express")
const { login, register, authToken } = require("../controllers/authController");
const { getByUser, createBooking } = require("../controllers/bookingController");
const { getAllTables } = require("../controllers/tableController");
const { auth } = require("../middleware/authMiddleware")

const router = express.Router();

//table
router.get("/table", getAllTables)
//user
router.post("/login", login)
router.post("/register", register)
router.post("/auth", authToken)
//booking
router.get("/book")
router.post("/book/create", auth, createBooking)
router.get("/book/:userId", auth, getByUser)

module.exports = router;