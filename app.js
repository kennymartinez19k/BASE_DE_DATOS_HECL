const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const SqlConnection  = require("./sqlConnection")
const router = express.Router();

const sqlConnection = new SqlConnection()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(router);
require('./router')(router, sqlConnection);

app.listen(port, async () => {
  let result = await sqlConnection.connect()
  if(result == true){
    console.log(`Servidor iniciado en http://localhost:${port}`)
  }else{
    console.log('Servidor no pudo conectarse a la DB', result)
  }
})
