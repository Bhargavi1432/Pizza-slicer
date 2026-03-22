const express = require("express");
const app = express();

// Middleware to read JSON
app.use(express.json());

// Dummy database
let users = [
  { id: 1, name: "Bhargavi", age: 20 },
  { id: 2, name: "Ravi", age: 22 }
];


// 1️⃣ GET all users (with optional query)
app.get("/users", (req, res) => {
  const age = req.query.age;

  if (age) {
    const filteredUsers = users.filter(u => u.age == age);
    return res.json(filteredUsers);
  }

  res.json(users);
});


// 2️⃣ GET single user (route param)
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});


// 3️⃣ POST create user (request body)
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);

  res.status(201).json(newUser);
});


// 4️⃣ PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name;
  user.age = req.body.age;

  res.json(user);
});


// 5️⃣ DELETE user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(index, 1);

  res.send("User deleted");
});


// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});