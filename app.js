const express = require('express')
const bodyParser = require('body-parser')
const Connection = require('tedious').Connection  // Cocnetamos el server con tedious utilizando docker ya que nos presento un error a la hora de utilizar el tcp/ip de nuestra maquina
var Request = require('tedious').Request;
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
