const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const ejs = require("ejs");

const app = express();

// Admin Password
const ADMIN_PASSWORD = "Chandan123";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb+srv://srivastavchandan178_db_user:Chandan12345@cluster0.ur3hvpc.mongodb.net/studentCB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// READ
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

// CREATE
app.post("/students", async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.send("Wrong Password");
  }

  const { name, age, course, city } = req.body;
  await Student.create({ name, age, course, city });
  res.redirect("/");
});

// UPDATE
app.post("/students/update/:id", async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.send("Wrong Password");
  }

  const { name, age, course, city } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, age, course, city });
  res.redirect("/");
});

// DELETE
app.post("/students/delete/:id", async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.send("Wrong Password");
  }

  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Render Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});