const User = require("../models/User");
const Tasks = require("../models/tasks");

exports.getTasks = (req, res, next) => {
  Tasks.find({ user: req.userId })
    .then((tasks) => {
      res.json({ message: "Task found !!!", tasks: tasks });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Tasks.findById(taskId).then((result) => {
    if (!result) {
      const err = new Error("Task not found!!!");
      err.statusCode = 404;
      throw err;
    }
    res.json({ message: "Task Found", task: result });
  });
};

exports.addTasks = (req, res, next) => {
  const title = req.body.title;
  const done = req.body.done;
  const description = req.body.description;
  if (!title || !description) {
    const err = new Error("Title or description missing.");
    err.statusCode = 404;
    throw err;
  }
  const task = new Tasks({
    title: title,
    done: done,
    user: req.userId,
    description: description,
  });
  task.save();
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const err = new Error("No user found Please Login!!!");
        err.statusCode = 404;
        throw err;
      }
      user.Tasks.addToSet(task._id);
      user.save();
    })
    .then((result) => {
      res.json({ message: "Task saved successfully!!!", result: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editTasks = (req, res, next) => {
  const taskId = req.params.taskId;
  Tasks.findById(taskId)
    .then((task) => {
      if (!task) {
        const err = new Error("No task found.");
        err.statusCode = 404;
        throw err;
      }
      const done = req.body.done;
      task.title = title;
      task.done = done;
      return task.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Task Updated Successfully.", task: result });
    });
};

exports.putTasks = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Tasks.findById(taskId);

    if (!task) {
      const err = new Error("Task not found");
      err.statusCode = 404;
      throw err;
    }

    task.done = !task.done;

    await task.save();

    res.status(200).json("Task updated!");
  } catch (error) {
    console.error(error);
    res.status(400).json("Error: " + error);
  }
};

exports.deleteTasks = (req, res, next) => {
  const taskId = req.params.taskId;
  Tasks.findByIdAndRemove(taskId)
    .then((task) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      if (!user) {
        const err = new Error("User not found!!!");
        err.statusCode = 404;
        throw err;
      }
      user.Tasks.pull(taskId);
      return user.save();
    })
    .then((result) => {
      res.json({ message: "Task deleted.", tasks: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
