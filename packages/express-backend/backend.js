// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });


/* GET Endpoints */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    const result = filterUsers({ name, job });
    res.json({ users_list: result });
  });

  
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


/* POST Endpoints */
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const user = addUser(userToAdd);
    res.status(201).json(user);
});

/* DELETE Endpoints */

// remove a particular user by id from the list
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const removed = deleteUserById(id);
    if (!removed) {
        return res.status(404).send("Resource not found.");
    }
    res.status(204).end();
});