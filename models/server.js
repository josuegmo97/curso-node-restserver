const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Rutas
        this.paths = {
            userPath: '/api/user',
            authPath: '/api/auth',
            categoryPath: '/api/category',
            productPath: '/api/product',
            searchPath: '/api/search',
            uploadPath: '/api/upload',
        }

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del lobby
        this.app.use(express.json())
        // this.app.use(express.urlencoded())

        // Directorio publico
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))

    }

    routes() {
        this.app.use(this.paths.userPath, require('../routes/user'))
        this.app.use(this.paths.authPath, require('../routes/auth'))
        this.app.use(this.paths.categoryPath, require('../routes/category'))
        this.app.use(this.paths.productPath, require('../routes/product'))
        this.app.use(this.paths.searchPath, require('../routes/search'))
        this.app.use(this.paths.uploadPath, require('../routes/upload'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server