import { Sequelize } from "sequelize";

const db = new Sequelize("buci_todo_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
