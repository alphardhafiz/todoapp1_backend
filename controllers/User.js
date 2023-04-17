import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    await User.create({
      name: name,
      email: email,
    });
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { name, email } = req.body;
    await User.update(
      {
        name: name,
        email: email,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
