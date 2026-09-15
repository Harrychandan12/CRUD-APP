const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentCB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// READ - Show all students
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

// CREATE - Add new student
app.post("/students", async (req, res) => {
  const { name, age, course, city } = req.body;
  await Student.create({ name, age, course, city });
  res.redirect("/");
});

// UPDATE - Edit student
app.post("/students/update/:id", async (req, res) => {
  const { name, age, course, city } = req.body;
  await Student.findByIdAndUpdate(req.params.id, {
    name,
    age,
    course,
    city,
  });
  res.redirect("/");
});

// DELETE - Remove student
app.post("/students/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Render Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});