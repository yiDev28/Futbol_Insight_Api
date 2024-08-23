import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization']

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const Token = headerToken.slice(7)
            const tokenValid = jwt.verify(Token, process.env.SECRET_KEY || 'hola')

            next()

        } catch (error) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }


    } else {
        return res.status(401).json({
            msg: `No envio token`
        })
    }

}

export default validateToken