import {Request, Response, Router} from "express";
import {serviceBlog} from "../domain/blog-service";
import {repositoryBlog} from "../repository/blog-repository";
import {PostIdType, QueryParamsBlog, QueryParamsPost} from "../types";
import {errorsMessages} from "../middleware/error-middleware";
import {authorization} from "../middleware/authorization";
import {blogMiddleware} from "../middleware/blog-middleware";
import {postForBlogMiddleware} from "../middleware/postforblog-middleware";

export const blogRouter = Router()


blogRouter.get('/', async (req: Request<{}, {}, {}, QueryParamsBlog>, res: Response) => {

    const blogGet = await repositoryBlog.findBlog(
        req.query.pageNumber ?? 1,
        req.query.pageSize ?? 10,
        req.query.sortBy ?? 'createdAt',
        req.query.sortDirection ?? 'desc',
        req.query.searchNameTerm ?? ''
    )

    res.status(200).json(blogGet)

})


blogRouter.post('/', authorization, blogMiddleware, errorsMessages, async (req: Request, res: Response) => {

    const blogCreate = await serviceBlog.createBlog(
        req.body.name,
        req.body.description,
        req.body.websiteUrl
    )
    res.status(201).json(blogCreate)

})

blogRouter.get('/:id/posts', async (req: Request<PostIdType, {}, {}, QueryParamsPost>, res: Response) => {

    const findBlogForId = await repositoryBlog.findBlogId(req.params.id)
    if (!findBlogForId) {
        res.sendStatus(404)
        return
    }

    const blogGetId = await repositoryBlog.findPostForBlog(
        req.query.pageNumber ?? 1,
        req.query.pageSize ?? 10,
        req.query.sortBy ?? 'createdAt',
        req.query.sortDirection ?? 'desc',
        req.params.id
    )
    if (blogGetId) {
        res.status(200).json(blogGetId)
        return
    }

})

blogRouter.post('/:id/posts', authorization, postForBlogMiddleware,
    errorsMessages, async (req: Request, res: Response) => {

        const findBlogForId = await repositoryBlog.findBlogId(req.params.id)
        if (!findBlogForId) {
            res.sendStatus(404)
            return
        }


        const blogGetById = await repositoryBlog.createPostForBlog(
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.params.id)

        if (blogGetById) {
            res.status(201).json(blogGetById)
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

blogRouter.put('/:id', authorization, blogMiddleware, errorsMessages, async (req: Request, res: Response) => {

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

blogRouter.delete('/:id', authorization, async (req: Request, res: Response) => {

    const blogGetId = await serviceBlog.findBlogId(req.params.id)
    if (!blogGetId) {
        res.sendStatus(404)
        return
    }

    const blogDelete = await repositoryBlog.deleteBlogId(req.params.id)
    res.sendStatus(204)

})












