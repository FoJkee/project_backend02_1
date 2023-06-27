import {Response, Request, Router} from "express";
import {repositoryBlog} from "../repository/blog-repository";
import {repositoryPost} from "../repository/post-repository";

export const deleteRouter = Router()


deleteRouter.delete('/all-data', async (req: Request, res: Response) => {
    await repositoryBlog.deleteBlogAll()
    await repositoryPost.deletePostAll()
    res.sendStatus(204)
})