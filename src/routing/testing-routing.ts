import {Response, Request} from "express";
import {deleteRouter} from "../setting";
import {repositoryBlog} from "../repository/blog-repository";


deleteRouter.delete('/all-data', (req: Request, res: Response) => {
    repositoryBlog.deleteBlogAll()

    res.sendStatus(204)
})