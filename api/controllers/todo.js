const db = require("../models");

exports.listTodos = async (req, res, next) => {
  try {
    // find the user first
    let user = await db.User.findOne({ username: req.params.username });
    // extract the user todos
    if (user.todos) {
      let todosList = [];
      let userTodos = user.todos.map(async todo => {
        let _todo = await db.Todo.findById(todo);
        todosList.push(_todo);
      });
      await Promise.all(userTodos);
      return res.status(200).json(todosList);
    } else {
      // return empty list
      return res.status(200).json([]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    // find the user
    let user = await db.User.findOne({ username: req.params.username });
    // create the todo
    let todo = await db.Todo.create({ text: req.body.text, user });
    // push the newly created todo to user todos
    user.todos.push(todo);
    await user.save();
    const { _id, text } = todo;
    return res.status(200).json({ _id, text });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    await db.Todo.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      { new: true },
      (err, updatedTodo) => {
        if (err) {
          return res.status(400).json(err.message);
        }
        return res.status(200).json(updatedTodo);
      }
    );
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    let todo = await db.Todo.findById(req.params.todoId);
    await todo.remove();
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
