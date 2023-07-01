import {Request, Response, Router} from "express";
import {repositoryPost} from "../repository/post-repository";
import {PostIdType, QueryParamsPost} from "../types";
import {authorization} from "../middleware/authorization";
import {postMiddleware} from "../middleware/post-middleware";
import {errorsMessages} from "../middleware/error-middleware";


export const postRouter = Router()

postRouter.get('/', async (req: Request<{}, {}, {}, QueryParamsPost>, res: Response) => {


    const postGet = await repositoryPost.findPost(
        Number(req.query.pageNumber) || 1,
        Number(req.query.pageSize) || 10,
        req.query.sortBy || "createdAt",
        req.query.sortDirection || "desc"
    )

    return res.status(200).json(postGet)

})

postRouter.post('/', authorization, postMiddleware, errorsMessages, async (req: Request<{}, {}, PostIdType>, res: Response) => {

    const postCreate = await repositoryPost.createPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
        req.body.blogName
    )
    res.status(201).json(postCreate)

})

postRouter.get('/:id', async (req: Request, res: Response) => {

    const postGetId = await repositoryPost.findPostId(req.params.id)

    if (postGetId) {
        res.status(200).json(postGetId)
    } else {
        res.sendStatus(404)

    }

})

postRouter.put('/:id', authorization, postMiddleware, errorsMessages, async (req: Request, res: Response) => {

    const postPutId = await repositoryPost.findPostId(req.params.id)

    if (!postPutId) {
        res.sendStatus(404)

    } else {
        res.status(204).json(postPutId)
    }

    const postPut = await repositoryPost.updatePostId(req.params.id, req.body.title, req.body.shortDescription,
        req.body.content, req.body.blogId)

})

postRouter.delete('/:id', authorization, async (req: Request, res: Response) => {

    const postDeleteId = await repositoryPost.findPostId(req.params.id)

    if (!postDeleteId) {
        res.sendStatus(404)
        return
    }

    const postDelete = await repositoryPost.deletePostId(req.params.id)
    return res.sendStatus(204)


})





