const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/product-routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api", productRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/Products")
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });


