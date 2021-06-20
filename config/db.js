const mongoose = require('mongoose')
require('dotenv').config({ path : 'variables.env' })

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluster0.nmmg0.mongodb.net/merntasks?retryWrites=true&w=majority', {
            // useCreateIndex: true,
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        })

        console.log('Conectado a Mongodb')

    } catch (error) {
        console.log("Erro al conectarme a Mongodb")
        process.exit(1)
    }
}

module.exports = conectarDB