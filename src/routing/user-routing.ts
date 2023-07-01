import {Request, Response, Router} from "express";
import {authorization} from "../middleware/authorization";
import {repositoryUser} from "../repository/user-repository";
import {usersServise} from "../domain/user-servise";
import {QueryParamsUser} from "../types";
import {userMiddleware} from "../middleware/user-middleware";
import {errorsMessages} from "../middleware/error-middleware";


export const userRouter = Router({})


userRouter.get('/',  async (req: Request<{}, {}, {}, QueryParamsUser>, res: Response) => {

    const userGet = await repositoryUser.findUser(
        Number(req.query.pageNumber) || 1,
        Number(req.query.pageSize) || 10,
        req.query.sortBy || 'createdAt',
        req.query.sortDirection || "desc",
        req.query.searchLoginTerm || '',
        req.query.searchEmailTerm || '',
    )
   return res.status(200).json(userGet)

})


userRouter.post('/', authorization, userMiddleware, errorsMessages, async (req: Request, res: Response) => {
    const newUser = await usersServise.createUser(req.body.login, req.body.email, req.body.password)
    return res.status(201).json(newUser)

})




userRouter.delete('/:id', authorization, async (req: Request, res: Response) => {
    const deleteUserId = await repositoryUser.findUserById(req.params.id)

    if(!deleteUserId){
        res.sendStatus(404)
        return
    }

    const deleteUser = await repositoryUser.deleteUserForId(req.params.id)
    res.sendStatus(204)


})