// import Sequelize
const { Sequelize } = require('sequelize');

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

/**
 * Membuat koneksi database menggunakan method createConnection
 * Method menerima parameter object: host, user, password, database
 */
const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

/**
 * Menghubungkan ke database menggunakan method connect
 * Menerima parameter callback
 */
async function connect() {
  try {
    await db.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting", error);
  }
}
connect();



module.exports = db;
