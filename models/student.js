const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
  city: String
});

module.exports = mongoose.model("Student", studentSchema);
