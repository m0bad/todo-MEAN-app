const jwt = require("jsonwebtoken");

const db = require("../models");

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please Login First"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please Login First"
    });
  }
};

exports.ownTodo = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.params.username });
    const todo = await db.Todo.findById(req.params.todoId);
    let hasOwnership = user.todos.includes(todo._id);
    if (hasOwnership) {
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized"
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};
