const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

const ratesRouter = require("./routes/rates");
app.use("/rates", ratesRouter);

app.listen(PORT, console.log("Backend connected on port", PORT));
