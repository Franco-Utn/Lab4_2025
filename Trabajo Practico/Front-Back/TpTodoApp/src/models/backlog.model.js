const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

module.exports = mongoose.model("Backlog", backlogSchema);