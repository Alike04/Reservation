const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/router")
const cors = require("cors");
require("dotenv").config()

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: false
}));

app.use(express.json());

app.use("/api", router);

mongoose.set('strictQuery', false);


mongoose.connect("mongodb://localhost:27017/reservation").then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  })
})