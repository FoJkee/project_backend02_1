import {ObjectId} from "mongodb";
import {BlogIdType} from "../types";
import {repositoryBlog} from "../repository/blog-repository";


export const serviceBlog = {

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogIdType> {

        const blogCreate = {
                _id: new ObjectId(),
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            }

            return await repositoryBlog.createBlog(blogCreate)
    },

    async findBlogId(id: string): Promise<BlogIdType | null> {
        return await repositoryBlog.findBlogId(id)
    },
    async updateBlogId(id: string, name: string, description: string, websiteUrl: string){
        return await repositoryBlog.updateBlogId(id, name, description, websiteUrl)
    },

    async deleteBlogId(id:string): Promise<boolean>{
        return await repositoryBlog.deleteBlogId(id)
    },

    async deleteBlogAll():Promise<boolean>{
        return await repositoryBlog.deleteBlogAll()
    }







}