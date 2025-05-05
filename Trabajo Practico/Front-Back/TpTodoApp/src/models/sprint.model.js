const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  color: String
});

module.exports = mongoose.model("Sprint", sprintSchema);