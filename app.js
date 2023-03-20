const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Routes = require("./routes/routes");

const app = express();
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(cors());

app.use("/api", Routes);

// `mongodb+srv://no1User:hesamrahmanihrmn@gmail.com@no1shop.5pnmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose
  .connect(
    // `${process.env.DB}://${process.env.USER}:${process.env.UPASSWORD}${process.env.DOMAIN}/LocalShop`,
    `mongodb+srv://no1User:hesamrahmanihrmn%40gmail.com@no1shop.5pnmv.mongodb.net/LocalShop?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
    )
  .then(() => {
    console.log("Connected to MongoDB");
    app.get("/", (req, res, next) => {
      res.send("No1 Shop Api");
    });
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 3000, "0.0.0.0", function () {
      console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
