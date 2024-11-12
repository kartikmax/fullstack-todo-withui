const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const User = require("./models/user.model.js");

const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/NodeApi")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Connection failed");
  });
