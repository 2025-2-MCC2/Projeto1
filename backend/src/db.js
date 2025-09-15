import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_PASSWORD,
  waitForConnections: process.env.MYSQL_DB,
  connectionLimit: 10 
});
