const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password') // .select('-atributo1 -atributo2')
        res.json({usuario})

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg : 'Hubo un error' })
    }
}

exports.autenticarUsuario = async (req, res) => {
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })
        if(!usuario) { return res.status(400).json({ msg : "El usuario no existe" }) }

        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto) { return res.status(400).json({ msg : "Password Incorrecto" }) }

        const payload = {
            usuario : {
                id : usuario.id
            }
        }

        // TOKEN PARA CREAR UNA SESION POR UNA HORA
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn : 3600 
        }, (error, token) => {
            if(error) throw error
            res.json({ token })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg : 'Hubo un error' })
    }

}