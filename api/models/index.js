const mongoose = require("mongoose");

const MONGO_URL = process.env.DB_CONNECTION_URL;

// promisify mongoose
mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URL, {
    KeepAlive: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database successefuly");
  })
  .catch(err => {
    console.error("Database Connection Error:\n", err);
  });

module.exports.User = require("./user");
module.exports.Todo = require("./todo");
