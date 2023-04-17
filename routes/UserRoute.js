import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";

const route = express.Router();

route.get("/users", getUsers);
route.get("/users/:id", getUserById);
route.delete("/users/:id", deleteUser);
route.patch("/users/:id", updateUser);
route.post("/users", createUser);

export default route;
