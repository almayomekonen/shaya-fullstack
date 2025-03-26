const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log("Mongodb-connected successfully 💥🦾💥"))
  .catch((error) => console.error(error));

app.use("/api", authRoutes);
app.use("/news", newsRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
