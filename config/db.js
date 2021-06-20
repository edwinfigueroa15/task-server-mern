const mongoose = require('mongoose')
require('dotenv').config({ path : 'variables.env' })

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
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