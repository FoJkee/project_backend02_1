import {Request, Response, Router} from "express";
import {repositoryPost} from "../repository/post-repository";
import {QueryParamsPost} from "../types";


export const postRouter = Router()

postRouter.get('/', async (req: Request<{}, {}, {}, QueryParamsPost>, res: Response) => {


    const postGet = await repositoryPost.findPost(
        req.query.pageNumber ?? 1,
        req.query.pageSize ?? 10,
        req.query.sortBy ?? "createdAt",
        req.query.sortDirection ?? "desc"
    )
    return res.status(200).json(postGet)

})

postRouter.post('/', async (req: Request, res: Response) => {

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

    const postGetId = repositoryPost.findPostId(req.params.id)

    if (postGetId) {
        res.status(200).json(postGetId)
    } else {
        res.sendStatus(404)

    }

})

postRouter.put('/:id', async (req: Request, res: Response) => {

    const postPutId = await repositoryPost.findPostId(req.params.id)

    if (postPutId) {
        res.status(204).json(postPutId)
    } else {
        res.sendStatus(404)
    }

    const postPut = await repositoryPost.updatePostId(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
    )


})

postRouter.delete('/:id', async (req: Request, res: Response) => {

    const postDeleteId = await repositoryPost.findPostId(req.params.id)

    if (!postDeleteId) {
        res.sendStatus(404)
        return
    }

    const postDelete = await repositoryPost.deletePostId(req.params.id)
    return res.sendStatus(204)


})





