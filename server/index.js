require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const product_routes = require("./routes/roomRoute");
const user_routes = require("./routes/usersRoute");
const bookingroom_routes = require("./routes/bookingsRoute");
const morgan = require("morgan");
const connectDB = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use("/api/products", product_routes);
app.use("/api/users", user_routes);
app.use("/api/bookings", bookingroom_routes);
app.use(express.json());
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Sever is listening on the port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
