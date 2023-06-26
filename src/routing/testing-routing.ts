import {Response, Request} from "express";
import {deleteRouter} from "../setting";
import {repositoryBlog} from "../repository/blog-repository";
import {repositoryPost} from "../repository/post-repository";


deleteRouter.delete('/all-data', async (req: Request, res: Response) => {
    await repositoryBlog.deleteBlogAll()
    await repositoryPost.deletePostAll()
    res.sendStatus(204)
})