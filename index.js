import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoute.js";
import taskRoute from "./routes/TaskRoute.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(taskRoute);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
