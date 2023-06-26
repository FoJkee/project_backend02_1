import {Router} from "express";
import {PaginatorPost, QueryParamsPost} from "./types";


export const blogsRouter = Router()
export const postRouter = Router()
export const deleteRouter = Router()




export const paginationPost = (query: PaginatorPost):QueryParamsPost => {

    return {
        pageNumber: +query.pageNumber ?? 1,
        pageSize: +query.pageSize ?? 10,
        sortBy: query.sortBy ?? "createdAt",
        sortDirection: query.sortDirection ?? "desc"

    }

}




