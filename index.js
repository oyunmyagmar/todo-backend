const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const todoDatas = [
  {
    id: 1,
    task: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    task: "Finish project report",
    completed: true,
  },
  {
    id: 3,
    task: "Call the dentist",
    completed: false,
  },
  {
    id: 4,
    task: "Go for a run",
    completed: false,
  },
];

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", (req, res) => {
  res.json(todoDatas);
});

app.post("/tasks", (req, res) => {
  res.send("POST tasks");
});

app.delete("/tasks", (req, res) => {
  res.send("DELETE tasks");
});

app.put("/tasks", (req, res) => {
  res.send("UPDATE tasks");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
