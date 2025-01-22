const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.URI).then(()=>{
    console.log("MongoDB Connected");
  }).catch((err)=>{
    console.log(err);
  })
};

module.exports = connectDB;
