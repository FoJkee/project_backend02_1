import {Response, Router, Request} from "express";
import {errorsMessages} from "../middleware/error-middleware";
import {repositoryUser} from "../repository/user-repository";
import {userServise} from "../domain/user-servise";


export const authRouter = Router()


authRouter.post('/login', errorsMessages, async (req: Request, res: Response) => {

    const checkResult = await userServise.checkCredentials(req.body.loginOrEmail, req.body.password)

    res.status(204).json(checkResult)



})