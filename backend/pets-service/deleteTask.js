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
  const taskId = JSON.parse(event.body).taskId;
  data = await deleteTask(userId, taskId).then((value) => value);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ data }),
  };
  return response;
};

const deleteTask = async (userId, taskId) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let deleteTask = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("taskId", sql.Int, taskId)
      .query("DELETE FROM Task WHERE UserID = @userId AND TaskID = @taskId");
    let tasks = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(`select * from Task WHERE UserID = @userId`);
    pool.close();
    return { data: tasks.recordset, status: true };
  } catch (error) {
    return { data: undefined, status: false, message: error };
    console.log(error);
  }
};

// createTask(5,23,"do something","f**k some people",null, '2008-11-11 13:23:44',null,1).then(data=>{
//     console.log(data)
// })
