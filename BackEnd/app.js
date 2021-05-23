const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const productRoutes = require("./routes/product-routes");

const app = express();
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});


console.log(process.env.API_KEY)

 

app.use("/api", productRoutes);

mongoose
  .connect(`${process.env.DB}://${process.env.DOMAIN}:${process.env.PORT}/Products`)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });


