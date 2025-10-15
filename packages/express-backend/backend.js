// backend.js
import express from "express";
import cors from "cors";
import userService from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /users (supports ?name=, ?job=, or both)
app.get("/users", (req, res, next) => {
  const { name, job } = req.query;
  userService.getUsers(name, job)
    .then(users => res.json({ users_list: users }))
    .catch(next);
});

  
// GET /users/:id
app.get("/users/:id", (req, res, next) => {
  userService.findUserById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send("Resource not found.");
      res.json(user);
    })
    .catch(next);
});


// POST /users
app.post("/users", (req, res, next) => {
  userService.addUser(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
});

// DELETE /users/:id
app.delete("/users/:id", (req, res, next) => {
  userService.deleteUserById(req.params.id)
    .then(deleted => {
      if (!deleted) return res.status(404).send("Resource not found.");
      res.status(204).end();
    })
    .catch(next);
});

// error handler
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid id format" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});