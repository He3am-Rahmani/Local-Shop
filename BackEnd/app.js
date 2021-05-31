const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const Routes = require("./routes/routes");

const app = express();
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});


app.use("/api", Routes);

mongoose
  .connect(`${process.env.DB}://${process.env.DOMAIN}:${process.env.PORT}/Products`)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });


