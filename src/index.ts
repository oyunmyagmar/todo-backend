import express, { Application, Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app: Application = express();
const port = 3000;

const tasks = [
  {
    id: "2",
    name: "Buy groceries",
  },
  {
    id: "1",
    name: "Finish project report",
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!---");
});

//read
app.get("/tasks", (req: Request, res: Response) => {
  res.send(tasks);
});

//create
app.post("/tasks", (req: Request, res: Response) => {
  const id = uuidv4();
  const { name } = req.body;
  tasks.unshift({ id, name });
  res.status(201).send(`Created item id:${id}`);
});

//delete
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  tasks.filter((task) => task.id !== id);
  // id.remove();
  res.status(201).send(`Deleted item id:${id}`);
});

//update
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  res.send([]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/tasks", (req:Request, res) => {
//   res.json(todoDatas);
// });
