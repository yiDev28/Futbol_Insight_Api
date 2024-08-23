import express from 'express'
import routerProducts from '../routes/product';
import routerUsers from '../routes/user';
import { Product } from './product';
import { User } from './user';


class Server {
    private app: express.Application;
    private port: string

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes()
        this.dbconect()

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('corriendo puerto ' + this.port)
        })
    }
    routes() {
        this.app.use('/api/products', routerProducts)
        this.app.use('/api/users', routerUsers)
    }

    middlewares() {
        this.app.use(express.json())
    }
    async dbconect() {
        try {
            await Product.sync()
            await User.sync()
            console.log('Conectado a la base de datos')
        } catch (error) {
            console.error('Error conectando a la base de datos' + error)
        }
    }

}

export default Server