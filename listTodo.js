const sql = require('mssql')
const sqlConfig = {
  user: 'admin',
  password: '12345678',
  database: 'TodoApp',
  server: 'admin.clmauhxhmlm6.us-east-1.rds.amazonaws.com',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

let result;

exports.handler = async (event, context, callback) => {
    // TODO implement
    await getAllTask()
      .then((data) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  async function getAllTask() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        result = await sql.query`select * from Task`
        console.log(result.recordset)
       } catch (err) {
        return(err)
       }
    return result.recordset
  }

  getAllTask()