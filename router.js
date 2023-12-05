var Request = require('tedious').Request;

module.exports = function (app, sqlConnection) {

    // Ruta para conseguir listado de cursos
    app.get('/clase', async (req, res) => {
      let query = `SELECT * FROM Clase;`
      let result = await sqlConnection.get(query)
      return res.json({ result})
    })

    // Ruta para matricular a un usuario
    app.post('/clase', async (req, res) => {
      // TODO: Validar que el horario de una seccion de un estudiante no choquen con otra seccion que tenga el mismo
      let {estudiante_id, seccion_id, horas_cursadas} = req.body
        let query = `INSERT INTO Clase (EstudianteId, SeccionId, HorasCursadas) VALUES (${estudiante_id}, ${seccion_id}, ${horas_cursadas})`
        console.log(query)
        let result = await sqlConnection.post(query)
        return res.json({ result})
    })

    app.patch('/estudiante/:id/seccion', async (req, res) => {
      let {new_section_id, old_section_id} = req.body
      let {id } = req.params
        let query = `UPDATE Clase 
        set SeccionId = ${new_section_id}
        where EstudianteId = ${id} and SeccionId = ${old_section_id}`
        console.log(query)
        let result = await sqlConnection.post(query)
        return res.json({ result})
    })

    app.patch('/estudiante/:id/horas-cursadas', async (req, res) => {
      let {horas_cursadas, seccion_id} = req.body
      let {id } = req.params
        let query = `UPDATE Clase 
        set HorasCursadas = ${horas_cursadas}
        where EstudianteId = ${id} and SeccionId = ${seccion_id}`
        console.log(query)
        let result = await sqlConnection.post(query)
        return res.json({ result})
    })

    app.delete('/clase/:id/', async (req, res) => {
      let {id } = req.params
      let query = `DELETE FROM Clase WHERE id = ${id}`
      console.log(query)
      let result = await sqlConnection.post(query)
      return res.json({ result})
    })
    
    // Ruta para conseguir a un usuario

    app.get('/estudiantes', async (req, res) => {
      let query = `SELECT * FROM Estudiante;`
      let result = await sqlConnection.get(query)
      return res.json({ result})
    })


     // Ruta para conseguir una sesion

     app.get('/sesiones', async (req, res) => {
      let query = `SELECT pe.Nombre as 'Periodo',  p.Nombre 'Programa',  c.Nombre 'Curso', s.Nombre 'Seccion', s.Dia 'Dia', s.HoraInicio, s.HoraFin FROM Seccion as s
      JOIN Curso as c on s.CursoId = c.Id
      JOIN Programa as p on c.ProgramaId = p.Id
      JOIN Periodo as pe on s.PeriodoId = pe.Id`
      let result = await sqlConnection.get(query)
      return res.json({ result})
    })
}


