const express = require('express')
const bodyParser = require('body-parser')

const Connection = require('tedious').Connection  // Cocnetamos el server con tedious utilizando docker ya que nos presento un error a la hora de utilizar el tcp/ip de nuestra maquina
var Request = require('tedious').Request;

const config = {
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: 'grupo2',
      password: "123456"
    }
  },
  options: {
    port: 1435, // Docker esta ejecutando el puerto 1433 pero esta sirviendonos en el puerto 1435
    database: 'HECL_LANG_INSTITUTE',
    trustServerCertificate: true
  }
}

const connection = new Connection(config)
connection.connect()

connection.on('connect', (err) => {
  if(err) throw err
  console.log("Connected")
})

const app = express()
// Middleware para parsear el cuerpo de las peticiones HTTP
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Ruta para conseguir listado de cursos
app.get('/cursos', (req, res) => {
  const request = new Request(
    `SELECT * FROM cursos`,
    function (err, rowCount, row) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      }
    }
  );
  const result = [];
  request.on('row', function (columns) {
    const row = {};
    columns.forEach(function (column) {
      row[column.metadata.colName] = column.value;
    });
    result.push(row);
    setTimeout(() => {
      return res.json({ result: result })
    }, 1000)

  })

  connection.execSql(request);
})


// Ruta para matricular a un usuario
app.post('/usuario', (req, res) => {
  const { nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, curso_deseado} = req.body
  let matricula = `${String(telefono).slice(-4)}-${String(new Date().getTime()).slice(-4)}`
  const request = new Request(
    `INSERT INTO usuario (nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, matricula, curso_deseado) 
     VALUES ('${nombre}', '${apellido}', '${telefono}', '${email}', '${direccion}', '${dia_nacimiento}', '${mes_nacimiento}', '${ano_nacimiento}', ${matricula}  ${curso_deseado})`,
    function (err, rowCount) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      } else {
        let result ={ nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, matricula}
        return res.json({ message: 'Bienvenido a HECL Institute.', result }) 
      }
    }
  );
  connection.execSql(request);
})


app.post('/auditoria-academica', (req, res) => {
  const { matricula } = req.body
  const request = new Request(
    `INSERT INTO usuario (nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, matricula, curso_deseado) 
     VALUES ('${nombre}', '${apellido}', '${telefono}', '${email}', '${direccion}', '${dia_nacimiento}', '${mes_nacimiento}', '${ano_nacimiento}', ${matricula}  ${curso_deseado})`,
    function (err, rowCount) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      } else {
        let result ={ nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, matricula}
        return res.json({ message: 'Bienvenido a HECL Institute.', result }) 
      }
    }
  );
  connection.execSql(request);
})

// Ruta para actualizar un cliente
app.put('/clientes/:telefono', (req, res) => {
  const { telefono } = req.params
  const { nombre } = req.body

  console.log(telefono, nombre)
  
  const request = new Request(
    `
    update clientes set nombre = '${nombre}' where telefono = '${telefono}'`,
    function (err, rowCount) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      } else {
        return res.json({ message: 'Cliente Actualizado con exito.' }) 
      }
    }
  );
  connection.execSql(request);
})
// Ruta para eliminar un cliente
app.delete('/clientes/:telefono', (req, res) => {
  const { telefono } = req.params
  const request = new Request(
    `delete from clientes where telefono = '${telefono}'`,
    function (err, rowCount) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      } else {
        return res.json({ message: 'Cliente eliminado con exito.' }) 
      }
    }
  );
  connection.execSql(request);
})


// Ruta para mostrar los precios de los servicios
app.get('/precios', (req, res) => {
  const sql = 'SELECT precio FROM tipos_servicio, tipos_prenda, precios WHERE precios.tipo_prenda_id = tipos_prenda.id AND precios.tipo_servicio_id = tipos_servicio.id'
  let request = new Request(sql, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error al obtener los precios.' })
    }

    return res.json(result)
  })

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      console.log(column.value);
    });
  });
  connection.execSql(request);
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})
