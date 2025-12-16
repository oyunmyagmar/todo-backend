"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const node_fs_1 = __importDefault(require("node:fs"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!123");
});
function getTasks() {
    const data = node_fs_1.default.readFileSync("data.txt", "utf8");
    const tasks = JSON.parse(data);
    return tasks;
}
function writeTasks(tasks) {
    node_fs_1.default.writeFile("data.txt", JSON.stringify(tasks), (err) => {
        if (err) {
            console.error(err);
        }
    });
}
app.get("/tasks", (req, res) => {
    const { status } = req.query;
    const tasks = getTasks();
    const filteredTasks = tasks.filter((task) => {
        if (status === "All") {
            return true;
        }
        else if (status === "Active") {
            return !task.isDone;
        }
        else {
            return task.isDone;
        }
    });
    res.json({ tasks: filteredTasks, total: tasks.length });
});
app.post("/tasks", (req, res) => {
    const id = (0, uuid_1.v4)();
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
    });
    writeTasks(tasks);
    res.status(201).send(`Created item id:${id}`);
});
app.delete("/tasks/completed", (req, res) => {
    const tasks = getTasks();
    const activeTasks = tasks.filter((task) => !task.isDone);
    writeTasks(activeTasks);
    res.sendStatus(204);
});
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const tasks = getTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    writeTasks(newTasks);
    res.sendStatus(204);
});
app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const tasks = getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].name = name;
    writeTasks(tasks);
    res.sendStatus(204);
});
app.patch("/tasks/:id/check", (req, res) => {
    const id = req.params.id;
    const tasks = getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].isDone = !tasks[index].isDone;
    writeTasks(tasks);
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
