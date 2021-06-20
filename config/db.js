const mongoose = require('mongoose')
require('dotenv').config({ path : 'variables.env' })

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('Conectado a Mongodb')

    } catch (error) {
        console.log("Erro al conectarme a Mongodb")
        console.log(error)
        console.log("Fin error db")
        process.exit(1)
    }
}

module.exports = conectarDB