import User from "../models/UserModel.js";
import Task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const response = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const response = await Task.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!response) return res.status(404).json({ msg: "Task tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  const { name, due_date, user_id } = req.body;
  try {
    await Task.create({
      name: name,
      // dueDate: new Date(due_date).toISOString().split("T", 1)[0],
      dueDate: due_date,
      status: false,
      userId: user_id,
    });
    res.status(201).json({ msg: "Task Created" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  const { name, due_date, user_id } = req.body;
  try {
    await Task.update(
      {
        name: name,
        dueDate: due_date,
        userId: user_id,
      },
      {
        where: {
          id: task.id,
        },
      }
    );
    res.status(200).json({ msg: "Task Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateStatusTask = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  const { status } = req.body;
  try {
    await Task.update(
      {
        status: status,
      },
      {
        where: {
          id: task.id,
        },
      }
    );
    res.status(200).json({ msg: "Task Status Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const task = Task.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  try {
    await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
