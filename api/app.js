require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
