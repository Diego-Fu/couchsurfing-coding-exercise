const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Diego", friends: [2, 3] },
  { id: 2, name: "Eduardo", friends: [5] },
  { id: 3, name: "Monica", friends: [2, 1] },
  { id: 4, name: "Victor", friends: [3, 2] },
  { id: 5, name: "Jose", friends: [1, 2] },
];

router.get("/", (req, res) => res.json(users));

router.post("/", (req, res) => {
  console.log(req.body);

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    friends: req.body.friends || [],
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const updatedUser = {
    name: req.body.name,
  };

  users = users.map((user) =>
    user.id === userId ? { ...user, ...updatedUser } : user
  );
  res.json(users.find((user) => user.id === userId));
});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.sendStatus(204);
});

module.exports = router;
