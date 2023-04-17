import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateStatusTask,
  deleteTask,
} from "../controllers/Task.js";

const route = express.Router();

route.get("/tasks", getTasks);
route.get("/tasks/:id", getTaskById);
route.delete("/tasks/:id", deleteTask);
route.patch("/tasks/:id", updateTask);
route.patch("/tasks/status/:id", updateStatusTask);
route.post("/tasks", createTask);

export default route;
