const _ = require("lodash/fp");
const sql = require("mssql");
const UUID = require('uuid-int');
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
  data = await signin(username, password).then((value) => value);
  const response = {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
  return response;
};

const signin = async (userName, passwd) => {
  const username = userName;
  const password = passwd;
  try {
    let pool = await sql.connect(sqlConfig);
    let userID = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(`select UserID from Users WHERE Username = '${username}'`);
    if (userID.recordset.length>0) {
      return { data: null, message: "Tạo tài khoản thất bại", status: false };
    } else {
      const newAccount = pool
        .request()
        .input("UserID", sql.Int, Math.random()*1000000)
        .input("Username", sql.VarChar, username)
        .input("Passwd", sql.VarChar, password)
        .input("Active", sql.Int, 1)
        .query(`SET IDENTITY_INSERT Users ON 
        INSERT INTO Users (Username, Passwd, UserID, Active) VALUES (@Username, @Passwd, @UserID, @Active)`)
      return {
        data: (await newAccount).recordset,
        message: "",
        status: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// signin("acc1", "123").then((data) => {
//   console.log(data);
// });
