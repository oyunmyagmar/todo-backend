import express, { Application, Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app: Application = express();
const port = 3000;

let tasks = [
  {
    id: "2",
    name: "Buy groceries",
    isDone: false,
  },
  {
    id: "1",
    name: "Finish project report",
    isDone: false,
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!---");
});

//read - json gj bichegui blovch yagad json butsaj bga?
app.get("/tasks", (req: Request, res: Response) => {
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

  tasks.unshift({ id, name, isDone: false });
  res.status(201).send(`Created item id:${id}`);
});

//delete
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  console.log({ id });

  const newTasks = tasks.filter((task) => task.id !== id);
  tasks = newTasks;
  res.sendStatus(204); //No Content
});

//update
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].name = name;
  res.sendStatus(204);
});

//update
app.put("/check/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, isDone: !task.isDone };
    }
    return task;
  });
  // console.log(tasks, "tasks");
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/tasks", (req:Request, res) => {
//   res.json(todoDatas);
// });
