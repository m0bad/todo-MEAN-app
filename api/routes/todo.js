const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");

const { isLoggedIn, ownTodo } = require("../middlewares");

// prefix: /todos/:username

router.get("/", isLoggedIn, listTodos);
router.post("/", isLoggedIn, createTodo);
router.put("/:todoId", isLoggedIn, ownTodo, updateTodo);
router.delete("/:todoId", isLoggedIn, ownTodo, deleteTodo);

module.exports = router;
