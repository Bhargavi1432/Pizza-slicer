// connect node with sql
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD", // 👈 change this
  database: "myapp"
});

// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// 🟢 GET all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching users");
    }
    res.json(result);
  });
});

// 🟢 POST (Add user)
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.send("Please provide name and age");
  }

  const sql = "INSERT INTO users (name, age) VALUES (?, ?)";

  db.query(sql, [name, age], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error inserting data");
    }
    res.send("User added successfully");
  });
});

// 🟡 UPDATE user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const sql = "UPDATE users SET name=?, age=? WHERE id=?";

  db.query(sql, [name, age, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error updating user");
    }
    res.send("User updated successfully");
  });
});

// 🔴 DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error deleting user");
    }
    res.send("User deleted successfully");
  });
});

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});