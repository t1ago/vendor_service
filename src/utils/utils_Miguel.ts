import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authenticadorInteceptador = (req: Request, res: Response, next: NextFunction) => {

    const auth = req.headers.authorization

    if (!auth) {
        res.status(401).end()

    }

    const [, token] = auth!.split(' ')

    try {

        const dadosUser = jwt.verify(token, 'Secret');

        (req as any).user = dadosUser

        return next()

    }

    catch (error) {
        res.status(401).end()
    }
}