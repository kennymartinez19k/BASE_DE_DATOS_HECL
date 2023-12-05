var Request = require('tedious').Request;

module.exports = function (app, sqlConnection) {
    // Ruta para conseguir listado de cursos
    app.get('/cursos', async (req, res) => {
      let query = `SELECT table_name FROM INFORMATION_SCHEMA.TABLES;`
      let result = await sqlConnection.get(query)
      return res.json({ result})
    })
    
    // Ruta para matricular a un usuario
    app.post('/cursos', async (req, res) => {
        let query = `INSERT INTO cursos (nombre, duracion_horas) VALUES ('kenny', 2)`
        let result = await sqlConnection.post(query)
        return res.json({ result})
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
}


