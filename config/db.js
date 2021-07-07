const mongoose = require('mongoose')
require('dotenv').config({ path : 'variables.env' })

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO || 'mongodb+srv://root:root@cluster0.nmmg0.mongodb.net/merntasks', {
            //useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Conectado a Mongodb')

    } catch (error) {
        console.log("Erro al conectarme a Mongodb")
        console.log(error)
        console.log("Fin errors db")
        // process.exit(1)
    }
}

module.exports = conectarDB