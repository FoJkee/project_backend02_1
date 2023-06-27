import {Request, Response, Router} from "express";
import {serviceBlog} from "../domain/blog-domain";
import {repositoryBlog} from "../repository/blog-repository";
import {PostIdType, QueryParamsBlog, QueryParamsPost} from "../types";
import {errorsMessages} from "../middleware/error-middleware";

export const blogRouter = Router()


blogRouter.get('/', async (req: Request<{}, {}, {}, QueryParamsBlog>, res: Response) => {

    const blogGet = await repositoryBlog.findBlog(
        req.query.pageNumber ?? 1,
        req.query.pageSize ?? 10,
        req.query.sortBy ?? 'createdAt',
        req.query.sortDirection ?? 'desc',
        req.query.searchNameTerm ?? ''
    )

    return res.status(200).json(blogGet)

})


blogRouter.post('/', errorsMessages, async (req: Request, res: Response) => {

    const blogCreate = await serviceBlog.createBlog(
        req.body.name,
        req.body.description,
        req.body.websiteUrl
    )
    res.status(201).json(blogCreate)

})

blogRouter.get('/:id/posts', async (req: Request<PostIdType,{},{},QueryParamsPost>, res: Response) => {

    const findBlogForId = await repositoryBlog.findBlogId(req.params.id)
    if (!findBlogForId) {
        res.sendStatus(404)
        return
    }

    const blogGet = await repositoryBlog.findPostForBlog(
        req.query.pageNumber ?? 1,
        req.query.pageSize ?? 10,
        req.query.sortBy ?? 'createdAt',
        req.query.sortDirection ?? 'desc',
        req.params.blogId
    )

    return res.status(200).json(blogGet)

})



blogRouter.post('/:id/posts', async (req: Request, res: Response) => {

    const findBlogForId = await repositoryBlog.findBlogId(req.params.id)
    if (!findBlogForId) {
        res.sendStatus(404)
        return
    }


    const blogGet = await repositoryBlog.createPostForBlog(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.params.id)

    if (blogGet) {
        res.status(201).json(blogGet)
        return
    }


})

blogRouter.get('/:id', async (req: Request, res: Response) => {

    const blogGetId = await serviceBlog.findBlogId(req.params.id)
    if (blogGetId) {
        res.status(200).json(blogGetId)
    } else {
        res.sendStatus(404)
    }

})

blogRouter.put('/:id', async (req: Request, res: Response) => {

    const blogFindId = await serviceBlog.findBlogId(req.params.id)

    if (!blogFindId) {
        res.sendStatus(404)
    } else {
        res.status(204).json(blogFindId)
    }

    const blogPut = await serviceBlog.updateBlogId(
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.websiteUrl
    )


})
blogRouter.delete('/:id', async (req: Request, res: Response) => {

    const blogGetId = await serviceBlog.findBlogId(req.params.id)
    if (blogGetId) {
        res.status(200).json(blogGetId)
    } else {
        res.sendStatus(404)
    }

})












