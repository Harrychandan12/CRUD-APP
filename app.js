const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const User = require("./models/user");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Admin Password
const ADMIN_PASSWORD = "Chandan123";

// MongoDB Connection
mongoose.connect("mongodb+srv://srivastavchandan178_db_user:Chandan12345@cluster0.ur3hvpc.mongodb.net/studentCB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Login Page
app.get("/", (req, res) => {
  res.render("login");
});

// Register User
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send("User already exists");
  }

  await User.create({ email, password });
  res.redirect("/");
});

// Login Check
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.redirect("/students");
  } else {
    res.send("Invalid Email or Password");
  }
});

// CRUD Home
app.get("/students", async (req, res) => {
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
  res.redirect("/students");
});

// UPDATE
app.post("/students/update/:id", async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.send("Wrong Password");
  }

  const { name, age, course, city } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, age, course, city });
  res.redirect("/students");
});

// DELETE
app.post("/students/delete/:id", async (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.send("Wrong Password");
  }

  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/students");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});