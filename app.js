const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors")
require("dotenv").config();

const Routes = require("./routes/routes");

const app = express();
app.use(express.json({extended: false}));
// app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api", Routes);

// `mongodb+srv://no1User:hesamrahmanihrmn@gmail.com@no1shop.5pnmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose
  .connect(
    `mongodb+srv://no1User:hesamrahmanihrmn%40gmail.com@no1shop.5pnmv.mongodb.net/LocalShop?retryWrites=true&w=majority`
    ,
    { useUnifiedTopology:true,useNewUrlParser: true }
  )
  // `${process.env.DB}://${process.env.USER}:${process.env.UPASSWORD}${process.env.DOMAIN}/LocalShop`
  .then(() => {
    console.log("Connected to MongoDB");
    app.get('/',
    (req,res,next)=>{
      res.send([{userName:'No1',password:'GG'},{userName:'No2',password:'FF'}])
    }
    )
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
  