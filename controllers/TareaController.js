const Proyecto = require('../models/Proyecto')
const Tarea = require('../models/Tarea')
const { validationResult } = require('express-validator')

exports.obtenerTarea = async (req, res) => {
    const { proyecto } = req.query

    try {
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) { return res.status(404).json({ msg : 'Proyecto no encontrado' }) }
        if(existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        const tareas = await Tarea.find({ proyecto : proyecto })
        res.json({tareas})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.crearTarea = async (req, res) => {
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    const { proyecto } = req.body

    try {
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) { return res.status(404).json({ msg : 'Proyecto no encontrado' }) }
        if(existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json({ tarea })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarTarea = async (req, res) => {
    // VALIDAMOS SI LAS VALIDACIONES EL LAS RUTAS SE CUMPLIERON DE LO CONTRARIO RETORNAR EL ERROR
    const errores = validationResult(req)
    if(!errores.isEmpty()){return res.status(400).json({ errores : errores.array() })}

    const { proyecto, nombre, estado } = req.body
    const nuevaTarea = {}

    nuevaTarea.nombre = nombre
    nuevaTarea.estado = estado

    try {
        let tarea = await Tarea.findById(req.params.id)
        if(!tarea) { return res.status(404).json({ msg : 'Tarea no encontrada' }) }

        const existeProyecto = await Proyecto.findById(proyecto)
        if(existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        tarea = await Tarea.findOneAndUpdate({ _id : req.params.id }, nuevaTarea, { new : true } )
        res.json({tarea})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


exports.eliminarTarea = async (req, res) => {
    try {
        const { proyecto } = req.query

        let tarea = await Tarea.findById(req.params.id)
        if(!tarea) { return res.status(404).json({ msg : 'Tarea no encontrada' }) }

        const existeProyecto = await Proyecto.findById(proyecto)
        if(existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg : 'No autorizado' }) }

        await Tarea.findOneAndRemove({ _id : req.params.id })
        res.json({ msg : 'Tarea eliminada'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}
