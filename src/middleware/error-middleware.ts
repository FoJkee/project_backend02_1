import {NextFunction, Response, Request} from "express";
import {validationResult} from "express-validator";


export const errorsMessages = (req: Request, res: Response, next: NextFunction) => {

    const errMes = ({msg, path}: any) => {

        return {
            message: msg,
            field: path
        }
    }

    const resultErr = validationResult(req).formatWith(errMes)

    if (!resultErr.isEmpty()) {
        res.status(400).json({errorsMessages: resultErr.array({onlyFirstError: true})})
    } else {
        next()
    }
}