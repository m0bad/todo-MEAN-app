require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use((req, res, next) => {
  let err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
