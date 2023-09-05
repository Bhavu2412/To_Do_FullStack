const express = require("express");

const router = express.Router();

const taskController = require("../controllers/Tasks");
const isAuth = require("../isAuth");

router.get("/home", isAuth, taskController.getTasks);
router.post("/create", isAuth, taskController.addTasks);
router.patch("/edit/:taskId", isAuth, taskController.editTasks);
router.put("/update/:taskId", taskController.putTasks);
router.delete("/delete/:taskId", isAuth, taskController.deleteTasks);
router.get("/get/:taskId", taskController.getTask);
module.exports = router;
