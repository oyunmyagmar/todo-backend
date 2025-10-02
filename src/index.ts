import express, { Application, Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import fs, { write } from "node:fs";

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!123");
});

function getTasks() {
  const data = fs.readFileSync("data.txt", "utf8");
  const tasks = JSON.parse(data);

  return tasks;
}

function writeTasks(
  tasks: {
    id: string;
    name: string;
    isDone: boolean;
    // ; filteredStatus: string
  }[]
) {
  fs.writeFile("data.txt", JSON.stringify(tasks), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
//read
app.get("/tasks", (req: Request, res: Response) => {
  const tasks = getTasks();
  res.send(tasks);
});

//create
app.post("/tasks", (req: Request, res: Response) => {
  const id = uuidv4();
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "Name is required" });
    return;
  }

  const tasks = getTasks();

  tasks.unshift({
    id,
    name,
    isDone: false,
    // , filteredStatus: "Active"
  });

  writeTasks(tasks);
  res.status(201).send(`Created item id:${id}`);
});

//delete
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const tasks = getTasks();

  const newTasks = tasks.filter((task: { id: string }) => task.id !== id);

  writeTasks(newTasks);

  res.sendStatus(204); //No Content
});

//update-edit
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const tasks = getTasks();

  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].name = name;

  writeTasks(tasks);

  res.sendStatus(204);
});

//update
app.put("/check/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const tasks = getTasks();

  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].isDone = !tasks[index].isDone;

  writeTasks(tasks);

  res.sendStatus(204);
});

// //update-filter
// app.put("/filter/tasks/:btn", (req: Request, res: Response) => {
//   const btn = req.params.btn;

//   const tasks = getTasks();

//   const index = tasks.findIndex((task: string) => task.filteresStatus === btn);
//   writeTasks(tasks);

//   res.sendStatus(204);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/tasks", (req:Request, res) => {
//   res.json(todoDatas);
// });

// tasks = tasks.map((task) => {
//   if (task.id === id) {
//     return { ...task, isDone: !task.isDone };
//   }
//   return task;
// });
// console.log(tasks, "tasks");

// const checkedTasks = tasks.map((task: { id: string; isDone: boolean }) => {
//   if (task.id === id) return { ...task, isDone: !task.isDone };
// });
