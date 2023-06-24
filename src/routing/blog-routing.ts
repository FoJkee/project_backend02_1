import {Request, Response} from "express";
import {blogsRouter} from "../setting";
import {serviceBlog} from "../domain/blog-domain";
import {repositoryBlog} from "../repository/blog-repository";


// blogsRouter.get('/', (res: Response, req: Request) => {
//
//     const blogGet = repositoryBlog.findBlog()
//     return res.status(200).json(blogGet)
//
// })

blogsRouter.post('/', (res: Response, req: Request) => {

    const blogCreate = serviceBlog.createBlog(
        req.body.name,
        req.body.description,
        req.body.websiteUrl
    )
    return res.status(201).json(blogCreate)

})

// blogsRouter.get('/:id/posts', (res: Response, req: Request) => {
//
//     const blogGet = repositoryBlog.findBlog()
//     return res.status(200).json(blogGet)
//
// })
//
// blogsRouter.post('/:id/posts', (res: Response, req: Request) => {
//
//     const blogGet = repositoryBlog.findBlog()
//     return res.status(200).json(blogGet)
//
// })

blogsRouter.get('/:id', (res: Response, req: Request) => {

    const blogGetId = serviceBlog.findBlogId(req.params.id)
    if (blogGetId) {
        res.status(200).json(blogGetId)
    } else {
        res.sendStatus(404)
    }

})

blogsRouter.put('/:id', (res: Response, req: Request) => {

    const blogFindId = serviceBlog.findBlogId(req.params.id)

    if (!blogFindId) {
        res.sendStatus(404)
    } else {
        res.status(204).json(blogFindId)
    }

    const blogPut = serviceBlog.updateBlogId(
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.websiteUrl
    )
    return blogPut

})
blogsRouter.delete('/:id', (res: Response, req: Request) => {

    const blogGetId = serviceBlog.findBlogId(req.params.id)
    if (blogGetId) {
        res.status(200).json(blogGetId)
    } else {
        res.sendStatus(404)
    }

})












