const express = require("express");
const app = express();
const productRoutes = require("./routes/product");
const cloudinary = require("cloudinary");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const error = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.json({
    msg: "you are good to go",
  });
});

app.use(express.json({ limit: "10mb" })); // Adjust size as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const corsOptions = {
  origin: "https://ecommerce-seven-vert.vercel.app", // Frontend URL
  credentials: true, // Allow cookies or Authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log("Server is Listening" + process.env.PORT);
});
