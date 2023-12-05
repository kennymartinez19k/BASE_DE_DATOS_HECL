const express = require('express')
const bodyParser = require('body-parser')
const Connection = require('tedious').Connection  // Cocnetamos el server con tedious utilizando docker ya que nos presento un error a la hora de utilizar el tcp/ip de nuestra maquina
var Request = require('tedious').Request;
const port = 3000

const config = {
  server: "DESKTOP-DK2KB4G",
  authentication: {
    type: "default",
    options: {
      userName: 'sa',
      password: "123456"
    }
  },
  options: {
    port: 1433, // Puerto predeterminado de SQL Server
    database: 'HECL_LANG_INSTITUTE', // Cambia al nombre de tu base de datos
    trustServerCertificate: true // Opciones adicionales
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
    `SELECT * FROM usuarios WHERE matricula = 'x' LIMIT 1`,
    function (err, rowCount) {
      if (err) {
        console.error('Error executing SQL statement:', err.message);
        return res.json({ message: err.message })
      } else {
        let result ={ nombre, apellido, telefono, email, direccion, dia_nacimiento, mes_nacimiento, ano_nacimiento, matricula}
        `SELECT cursos.id, cursos.nombre, sesiones.sesion_numero, sesiones.descripcion FROM cursos
         LEFT JOIN sesiones ON cursos.id = sesiones.id_curso
         WHERE cursos.id = 1;`
        return res.json({ message: 'Bienvenido a HECL Institute.', result }) 
      }
    }
  );
  connection.execSql(request);
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})
