const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/api/usuarios'

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    middlewares(){

        // CORS
        this.app.use(cors())

        // Lectura y parseo del lobby
        this.app.use(express.json())
        // this.app.use(express.urlencoded())

        // Directorio publico
        this.app.use( express.static('public'));

    }

    routes(){
        
        this.app.use(this.userPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server