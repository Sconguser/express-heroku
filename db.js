const Pool = require("pg").Pool;
const { Client } = require('pg');
var pool = null;
if(process.env.DATABASE_URL)
{
    pool = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
    pool.connect();  
}else{
    pool = new Pool({
    user:"postgres",
    password:"admin",
    database:"jwt_pki",
    host:"localhost",
    port:5432,
});
}



// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
module.exports = pool;