const mongoose = require("mongoose");

const User = require("./user");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// function that removes the todoId from user todos array
const clearUserRecords = async (userId, todoId) => {
  let user = await User.findById(userId);
  user.todos.remove(todoId);
  await user.save();
};

// clear the database records affected by delete operations
todoSchema.pre("remove", async function(next) {
  try {
    await clearUserRecords(this.user, this._id);
    return next();
  } catch (err) {
    return next(err);
  }
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
