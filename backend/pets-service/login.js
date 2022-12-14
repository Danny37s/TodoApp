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
  const username = JSON.parse(event.body).username;
  const password = JSON.parse(event.body).password;
  data = await checkLogin(username, password).then(value=>value);
  const response = {
    statusCode: 200,
    body: JSON.stringify({data}),
  };
  return response;
  
};

const checkLogin = async (userName, passwd) => {
  const username = userName;
  const password = passwd;
  try {
    let pool = await sql.connect(sqlConfig);
    let userID = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(`select UserID from Users WHERE Username = '${username}' AND Passwd = '${password}'`);
    pool.close()
    return userID.recordset;
  } catch (error) {
    console.log(error);
  }
};


// checkLogin("admin", "admin").then(data=>{
//   console.log(data);
// })
