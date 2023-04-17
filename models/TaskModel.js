import { Sequelize } from "sequelize";
import Users from "./UserModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Tasks = db.define(
  "tasks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Tasks);
Tasks.belongsTo(Users, { foreignKey: "userId" });

export default Tasks;
// (async () => {
//   await db.sync();
// })();
