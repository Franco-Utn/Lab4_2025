const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["pendiente", "en progreso", "completado"], default: "pendiente" },
  deadline: { type: Date, required: true },
  color: String
});

module.exports = mongoose.model("Task", taskSchema);