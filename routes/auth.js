const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const MiddlewaresAuth = require('../middlewares/auth')
const AuthController = require('../controllers/AuthController')

router.get('/', 
    MiddlewaresAuth,    
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min : 6})
    ], 
    AuthController.usuarioAutenticado
)

router.post('/', 
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min : 6})
    ],
    AuthController.autenticarUsuario
)

module.exports = router