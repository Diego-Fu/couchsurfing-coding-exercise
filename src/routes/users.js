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

router.get('/relationship/:userId1/:userId2', (req, res) => {

  const userId1 = parseInt(req.params.userId1);
  const userId2 = parseInt(req.params.userId2);

  if (isNaN(userId1) || isNaN(userId2)) {
    return res.status(400).json({ error: 'Invalid user IDs' });
  }

  if (!users.some(user => user.id === userId1) || !users.some(user => user.id === userId2)) {
    return res.json({ error: 'One or both users do not exist' });
  }

  const userIndexMap = new Map(users.map((user, index) => [user.id, index]));

  let queue = [userId1];
  let visited = users.map(() => false);
  let distance = users.map(() => 0);

  visited[userIndexMap.get(userId1)] = true;

  while (queue.length) {
    let currentUser = queue.shift();
    let currentUserIndex = userIndexMap.get(currentUser);

    if (currentUser === userId2) {
      return res.json({ distance: distance[currentUserIndex] });
    }

    users[currentUserIndex].friends.forEach(friendId => {
      let friendIndex = userIndexMap.get(friendId);
      if (!visited[friendIndex]) {
        queue.push(friendId);
        visited[friendIndex] = true;
        distance[friendIndex] = distance[currentUserIndex] + 1;
      }
    });
  }

  res.json({ error: 'No relationship between users' });
});

module.exports = router;
