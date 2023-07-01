import {blogCollection, postCollection} from "../db";
import {BlogIdType, BlogType, PaginatedType, PostIdType, PostType} from "../types";
import {Filter, ObjectId, WithId} from "mongodb";


export const repositoryBlog = {

    async findBlog(pageNumber: number,
                   pageSize: number,
                   sortBy: string,
                   sortDirection: string,
                   searchNameTerm: string): Promise<PaginatedType<BlogIdType>> {

        const filter: Filter<BlogType> = {name: {$regex: searchNameTerm, $options: 'i'}}

        const result = await blogCollection
            .find(filter)
            .sort({[sortBy]: sortDirection = "desc"})
            .skip(pageSize * (pageNumber - 1))
            .limit(Number(parseInt("pageSize", 10)))
            .toArray()

        const itemBlog: BlogIdType[] = result.map(el => ({
            id: el._id.toString(),
            name: el.name,
            description: el.description,
            websiteUrl: el.websiteUrl,
            createdAt: el.createdAt,
            isMembership: el.isMembership

        }))

        const totalCount: number = await blogCollection.countDocuments(filter)
        const pagesCount: number = Math.ceil(totalCount / pageSize)

        const resultBlog: PaginatedType<BlogIdType> = {

            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: itemBlog

        }
        return resultBlog

    },

    async createBlog(blogCreate: WithId<BlogType>): Promise<BlogIdType> {

        const createBlogDb = await blogCollection.insertOne(blogCreate)

        return {

            id: createBlogDb.insertedId.toString(),
            name: blogCreate.name,
            description: blogCreate.description,
            websiteUrl: blogCreate.websiteUrl,
            createdAt: blogCreate.createdAt,
            isMembership: blogCreate.isMembership
        }
    },

    async findPostForBlog(pageNumber: number,
                          pageSize: number,
                          sortBy: string,
                          sortDirection: string, id: string): Promise<PaginatedType<PostIdType>> {


        const filter = {blogId: id}

        const result = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection = 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(Number(parseInt("pageSize", 10)))
            .toArray()

        const itemPostForBlog: PostIdType[] = result.map(el => ({

            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
            createdAt: el.createdAt
        }))

        const totalCount: number = await postCollection.countDocuments(filter)
        const pagesCount: number = Math.ceil(totalCount / pageSize)

        const resultPostsForBlog: PaginatedType<PostIdType> = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: itemPostForBlog

        }
        return resultPostsForBlog

    },


    async createPostForBlog(title: string,
                            shortDescription: string,
                            content: string,
                            blogId: string): Promise<PostIdType | null> {

        const createPostForBlogResult = await blogCollection.findOne({_id: new ObjectId(blogId)})

        if (!createPostForBlogResult) {
            return null
        }
        const createPostInBlog = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: createPostForBlogResult._id.toString(),
            blogName: createPostForBlogResult.name,
            createdAt: new Date().toISOString()
        }

        const result = await postCollection.insertOne(createPostInBlog)

        return {
            id: result.insertedId.toString(),
            title: createPostInBlog.title,
            shortDescription: createPostInBlog.shortDescription,
            content: createPostInBlog.content,
            blogId: blogId,
            blogName: createPostInBlog.blogName,
            createdAt: createPostInBlog.createdAt
        }

    },


    async findBlogId(id: string): Promise<BlogIdType | null> {
        const findBlogForId = await blogCollection.findOne({_id: new ObjectId(id)})

        if (findBlogForId) {
            return {
                id: findBlogForId._id.toString(),
                name: findBlogForId.name,
                description: findBlogForId.description,
                websiteUrl: findBlogForId.websiteUrl,
                createdAt: findBlogForId.createdAt,
                isMembership: findBlogForId.isMembership
            }

        } else {
            return null
        }

    },


    async updateBlogId(id: string, name: string, description: string, websiteUrl: string) {

        const updateBlogId = await blogCollection.updateOne({_id: new ObjectId(id)},
            {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                }
            })
        return updateBlogId.matchedCount === 1

    },

    async deleteBlogId(id: string): Promise<boolean> {
        const deleteBlog = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return deleteBlog.deletedCount === 1

    },

    async deleteBlogAll(): Promise<boolean> {
        const deleteAllBlog = await blogCollection.deleteMany({})
        return deleteAllBlog.deletedCount === 1

    }


}

