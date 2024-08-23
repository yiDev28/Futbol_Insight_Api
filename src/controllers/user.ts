import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.findOne({
        where: { username: username }
    })

    if (user) {
        return res.status(400).json({
            msg: 'usuario ya existe'
        })
    }
    try {
        await User.create({
            username: username,
            password: hashedPassword
        })

        return res.json({
            msg: `Usuario ${username} creado`,
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'error',
            error
        })
    }

}


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    //validamos si el usuaro existe en la base de datos

    const user: any = await User.findOne({
        where: { username: username }
    })

    if (!user) {
        return res.status(401).json({
            msg: `usuario ${username} no existe`
        })
    }

    //validamos password

    const passwordValid = await bcrypt.compare(password, user.password)
    console.log(passwordValid)

    if (!passwordValid) {
        return res.status(401).json({
            msg: `clave de usuario ${username} incorrecta`
        })
    }
    //generamos un token para el usuario


    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'HOLdfgdfgdfgdfgfgdfgdfgA', {
        expiresIn: '10000'
    })

    return res.status(200).json({
        msg: 'INGRESO CORRECTO',
        token: token
    })
}