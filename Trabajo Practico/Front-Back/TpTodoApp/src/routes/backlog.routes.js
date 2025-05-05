const express = require("express");
const router = express.Router();
const backlogController = require("../controllers/backlogController");

// Verifica que backlogController.getBacklog sea una función
router.get("/", backlogController.getBacklog);

// Verifica que backlogController.createBacklog sea una función
router.post("/", backlogController.createBacklog);

// Verifica que backlogController.addTaskToBacklog sea una función
router.put("/add-task/:taskId", backlogController.addTaskToBacklog);

module.exports = router;