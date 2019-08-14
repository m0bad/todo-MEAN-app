const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");

// prefix: /todos/:username

router.get("/", listTodos);
router.post("/", createTodo);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

module.exports = router;
