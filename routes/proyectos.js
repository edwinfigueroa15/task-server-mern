const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const MiddlewaresAuth = require('../middlewares/auth')
const ProyectoController = require('../controllers/ProyectoController')

router.get('/', 
    MiddlewaresAuth,
    ProyectoController.obtenerProyecto
)

router.post('/', 
    MiddlewaresAuth,
    [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    ProyectoController.crearProyecto
)

router.put('/:id', 
    MiddlewaresAuth,
    [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    ProyectoController.actualizarProyecto
)

router.delete('/:id', 
    MiddlewaresAuth,
    ProyectoController.eliminarProyecto
)

module.exports = router