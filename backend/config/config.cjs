require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.USER_PASSWORD,
    database: "secure_account_management",
    host: "127.0.0.1",
    dialect: "mysql"
  },

  test: {
    username: "root",
    password: process.env.USER_PASSWORD,
    database: "secure_account_management",
    host: "127.0.0.1",
    dialect: "mysql"
  },

  production: {
    username: "root",
    password: process.env.USER_PASSWORD,
    database: "secure_account_management",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};