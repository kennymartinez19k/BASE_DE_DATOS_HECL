const Connection = require('tedious').Connection 
var Request = require('tedious').Request;

module.exports = class SqlConnection{
  connection = null
  constructor(){
    const config = {
      server: "DESKTOP-DK2KB4G",
      authentication: {
        type: "default",
        options: {
          userName: 'hecl',
          password: "12345"
        }
      },
      options: {
        database: 'HECL_LANGUAGE_INSTITUTE',
        trustServerCertificate: true 
      }
    }
    this.connection = new Connection(config);
  }

  async connect(){
    return new Promise((res, rej) => {
      this.connection.connect((err) => {
        if (err) {
          console.log('Connection Failed');
          return rej(err)
        }
        console.log("is connected")
        return res(true)
      });
    })
  }

  async get(query) {
    return new Promise((res, rej) => {
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return rej(err)
        }
        // this.connection.close();
      });
    
      const result = [];
      request.on('row', function (columns) {
        const row = {};
        columns.forEach(function (column) {
          row[column.metadata.colName] = column.value;
        });
        result.push(row);
      })
    
      request.on('doneInProc', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
        return res(result)
      });
    
      this.connection.execSql(request);
    })
  }

  async post(query) {
    return new Promise((res, rej) => {
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return rej(err)
        }
        // this.connection.close();
      });
    
      request.on('doneInProc', () => {
        return res("ok")
      });
    
      this.connection.execSql(request);
    })
  }
}