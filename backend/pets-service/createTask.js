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
  const taskTitle = JSON.parse(event.body).taskTitle;
  const taskDescription = JSON.parse(event.body).taskDescription;
  const scheduledDate = JSON.parse(event.body).scheduledDate;
  const createDate = JSON.parse(event.body).createDate;
  const completedDate = JSON.parse(event.body).completedDate;
  const important = JSON.parse(event.body).important;
  data = await createTask(userId, taskId, taskTitle, taskDescription, scheduledDate,createDate, completedDate, important ).then(value=>value);
  const response = {
    statusCode: 200,
    body: JSON.stringify({data}),
  };
  return response;
  
};

const createTask = async (userId, taskId, taskTitle, taskDescription, scheduledDate,createDate, completedDate, important ) => {
    if(!createDate){
        d = new Date()
        createDate = d.toJSON()
    }
  try {
    let pool = await sql.connect(sqlConfig);
    let tasks = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("taskId", sql.Int, taskId)
      .input("taskTitle", sql.VarChar, taskTitle)
      .input("taskDescription", sql.VarChar, taskDescription)
      .input("scheduledDate", sql.DateTime, scheduledDate)
      .input("createDate", sql.DateTime, createDate)
      .input("completedDate", sql.DateTime, completedDate)
      .input("important", sql.Int, important)
      .execute('insertTask') 
    pool.close()
    return {data:tasks.recordsets, status:true};
  } catch (error) {
    return {data:undefined, status:false, message:error};
    console.log(error);
  }
};

// createTask(5,23,"do something","f**k some people",null, '2008-11-11 13:23:44',null,1).then(data=>{
//     console.log(data)
// })