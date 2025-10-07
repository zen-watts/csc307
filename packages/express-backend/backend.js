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

const users = {
    users_list: [
        {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
        },
        {
        id: "abc123",
        name: "Mac",
        job: "Influencer"
        },
        {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
        },
        {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
        },
        {
        id: "zap555",
        name: "Dennis",
        job: "Spy"
        }
    ]
};


/* GET Helpers */
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const filterUsers = ({ name, job }) => {
    return users.users_list.filter(u =>
        (name === undefined || name === u.name) &&
        (job === undefined || job === u.job));
}

/* POST Helpers */
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

/* DELETE Helpers */
const deleteUserById = (id) => {
    const before = users.users_list.length;
    users.users_list = users.users_list.filter(u => String(u.id) !== String(id));
    return users.users_list.length < before; // Seems reasonable
}


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
    const id = req.params["id"]; //or req.params.id
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
    addUser(userToAdd);
    res.send();
});

/* DELETE Endpoints */

// remove a particular user by id from the list
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const removed = deleteUserById(id);
    if (!removed) {
        res.status(404).send("Resource not found.");
    }
    res.status(204).end();
});