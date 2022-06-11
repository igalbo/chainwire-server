const express = require("express");
const mongoose = require("mongoose");
const app = express();

const mongoUrl =
  "mongodb+srv://igal:tLsmpIOzjmWdGUAM@cluster0.wkkk3.mongodb.net/rates?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const ratesRouter = require("./routes/rates");
app.use("/rates", ratesRouter);

app.listen(5000, console.log("Backend Connected"));
