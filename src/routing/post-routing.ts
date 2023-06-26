import {postRouter} from "../setting";
import {Request, Response} from "express";
import {repositoryPost} from "../repository/post-repository";















postRouter.post('/', async (res: Response, req: Request) => {

    const postCreate = await repositoryPost.createPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
        req.body.blogName
    )
    res.status(201).json(postCreate)

})

postRouter.get('/:id', async (res: Response, req: Request) => {

    const postGetId = repositoryPost.findPostId(req.params.id)

    if (postGetId) {
        res.status(200).json(postGetId)
    } else {
        res.sendStatus(404)

    }

})

postRouter.put('/:id', async (res: Response, req: Request) => {

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

postRouter.delete('/:id', async (res: Response, req: Request) => {

    const postDeleteId = await repositoryPost.findPostId(req.params.id)

    if (!postDeleteId) {
        res.sendStatus(404)
        return
    }

    const postDelete = await repositoryPost.deletePostId(req.params.id)
    return res.sendStatus(204)


})





