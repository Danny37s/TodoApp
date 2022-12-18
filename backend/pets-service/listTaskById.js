const _ = require("lodash/fp");
const sql = require("mssql");
const sqlConfig = {
  user: "admin",
  password: "12345678",
  database: "TodoApp",
  server: "admin.clmauhxhmlm6.us-east-1.rds.amazonaws.com",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};
let data = "payload";
exports.handler = async (event, context, callback) => {
  const userId = JSON.parse(event.body).userId;
  data = await tasks(userId).then(value=>value);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body: JSON.stringify({data}),
  };
  return response;
  
};

const tasks = async (userID) => {
  const userId = userID;
  try {
    let pool = await sql.connect(sqlConfig);
    let tasks = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(`select * from Task WHERE UserID = @userId`);
    pool.close()
    return tasks.recordset;
  } catch (error) {
    console.log(error);
  }
};

