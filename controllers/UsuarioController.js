const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.store = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    const { email, password } = req.body

    try {
        // CONSULTANDO POR EL EMAIL
        let usuario = await Usuario.findOne({ email })

        // VALIDAR QUE EL EMAIL SE UNICO
        if(usuario) { return res.status(400).json({ msg: 'El usuario ya existe' }) }
        
        // INSERTANDO EL NUEVO USUARIO
        usuario = new Usuario(req.body)

        // HASHER LA CONTRASEÑA
        const salt = await bcryptjs.genSaltSync(10)
        usuario.password = await bcryptjs.hashSync(password, salt)

        // GUANDANDO EL USUARIO INSERTADO EN LA BASE DE DATOS
        await usuario.save()

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
        res.status(400).send('Hubo un error')
    }
}