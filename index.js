// connect node with sql
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// 🔗 Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "myapp"
});

// Connect
db.connect((err) => {
  if (err) {
    console.log("❌ Error connecting:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});
