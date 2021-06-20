const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

// INICIAR EXPRESS
const app = express()

// CONECTAR A LA BASE DE DATOS
conectarDB()

// HABILITAR CORS
app.use(cors())

// OBTENER LOS DATOS EN FORMATO JSON DESDE EL FRONTEND
app.use(express.json({extended: true}))

// RUTAS
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

// INICIAR SERVIDOR
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})