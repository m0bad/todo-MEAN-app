const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_URL, {
  KeepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require("./user");
module.exports.Todo = require("./todo");
