import {body} from "express-validator";
import {repositoryBlog} from "../repository/blog-repository";


export const postMiddleware = [
    body('title').exists().trim().isString().isLength({min:1, max: 30}).withMessage('Incorrect title'),
    body('shortDescription').exists().trim().isString().isLength({min: 1, max: 30}).withMessage('Incorrect shortDescription'),
    body('content').exists().trim().isString().isLength({min: 1, max: 1000}).withMessage('Incorrect content'),
    body('blogId').exists().isString().custom(async (v, {req}) => {
        const blogsData = await repositoryBlog.findBlogId(v)
        if(!blogsData) throw new Error()
        req.body.blogName = blogsData.name
        return true
    })
]
