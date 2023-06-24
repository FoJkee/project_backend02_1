import {blogCollection} from "../db";
import {BlogIdType, BlogType, PaginatedType, QueryParamsBlogView} from "../types";
import {Filter, ObjectId, WithId} from "mongodb";


export const repositoryBlog = {
    async findBlog(pagination: QueryParamsBlogView): Promise<PaginatedType<BlogIdType>> {

        const filter: Filter<QueryParamsBlogView> = {name: {$regex: pagination.searchNameTerm ?? '', $options: 'i'}}

        const result = await blogCollection
            .find({filter})
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .skip(pagination.pageSize * (pagination.pageNumber - 1))
            .limit(pagination.pageSize)
            .toArray()

        const itemBlog: BlogIdType[] = result.map(el => ({
            id: el._id.toString(),
            name: el.name,
            description: el.description,
            websiteUrl: el.websiteUrl,
            createdAt: el.createdAt,
            isMembership: el.isMembership

        }))
        const totalCount = await blogCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pagination.pageSize)

        const resultBlog = {
            pagesCount: pagesCount,
            page: pagination.pageNumber,
            pageSize: pagination.pageSize,
            totalCount: totalCount,
            item: itemBlog

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

    async deleteBlogId(id: string): Promise<boolean>{
        const deleteBlog = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return deleteBlog.deletedCount === 1

    },

    async deleteBlogAll():Promise<boolean>{
        const deleteAllBlog = await blogCollection.deleteMany({})
        return deleteAllBlog.deletedCount === 1

    }


}

