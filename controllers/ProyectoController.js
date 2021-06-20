const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.obtenerProyecto = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    try {
        const proyectos = await Proyecto.find({ creador : req.usuario.id }).sort({ created_at : -1 })
        res.json(proyectos)

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.crearProyecto = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    try {
        const proyecto = new Proyecto(req.body)
        proyecto.creador = req.usuario.id
        proyecto.save()
        res.json(proyecto)

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarProyecto = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    const { nombre } = req.body
    const nuevoProyecto = {}

    if(nombre){ nuevoProyecto.nombre = nombre }

    try {
        let proyecto = await Proyecto.findById(req.params.id)
        if(!proyecto) { return res.status(404).json({ msg : 'Proyecto no encontrado' }) }
        if(proyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        proyecto = await Proyecto.findOneAndUpdate({ _id : req.params.id }, nuevoProyecto, { new : true } )

        res.json({proyecto})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}


exports.eliminarProyecto = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    try {
        let proyecto = await Proyecto.findById(req.params.id)
        if(!proyecto) { return res.status(404).json({ msg : 'Proyecto no encontrado' }) }
        if(proyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        await Proyecto.findOneAndRemove({ _id : req.params.id })
        res.json({ msg : 'Proyecto eliminado'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}
