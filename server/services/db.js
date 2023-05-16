const mysql = require('mysql2/promise');
const config = require('../config');


const pool = mysql.createPool(config);

const executeMysqlQuery = (sql, data) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, data, (error, elements) => {
        if (error) {
          return reject(error)
        }
        return resolve(elements)
      })
    })
  }


//   await executeMysqlQuery(
//     `select * from companies where id in (${ids.join(',')})`
//   )


module.exports = executeMysqlQuery