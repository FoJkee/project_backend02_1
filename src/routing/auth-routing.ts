import {Response, Router, Request} from "express";
import {errorsMessages} from "../middleware/error-middleware";
import {usersServise} from "../domain/user-servise";


export const authRouter = Router({})


authRouter.post('/login', errorsMessages, async (req: Request, res: Response) => {

    const checkResult = await usersServise.checkCredentials(req.body.loginOrEmail, req.body.password)

    res.status(204).json(checkResult)



})