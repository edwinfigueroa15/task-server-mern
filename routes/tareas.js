const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const MiddlewaresAuth = require('../middlewares/auth')
const TareaController = require('../controllers/TareaController')

router.get('/',
    MiddlewaresAuth,
    TareaController.obtenerTarea
)

router.post('/', 
    MiddlewaresAuth,
    [check('nombre', 'El nombre es obligatorio').not().isEmpty()],
    TareaController.crearTarea
)

router.put('/:id', 
    MiddlewaresAuth,
    [check('nombre', 'El nombre es obligatorio').not().isEmpty()],
    TareaController.actualizarTarea
)

router.delete('/:id', 
    MiddlewaresAuth,
    TareaController.eliminarTarea
)

module.exports = router