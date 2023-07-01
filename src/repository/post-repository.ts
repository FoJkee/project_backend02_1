import {Filter, ObjectId} from "mongodb";
import {postCollection} from "../db";
import {PaginatedType, PostIdType, PostType} from "../types";

export const repositoryPost = {

    async findPost(pageNumber: number, pageSize: number,
                   sortBy: string, sortDirection: string): Promise<PaginatedType<PostIdType>>{

        const filter: Filter<PostType> = {}

        const findForPost = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection = 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(parseInt("pageSize", 10))
            .toArray()


        const itemPost: PostIdType[] = findForPost.map(el => ({
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

        const itemPostResponse: PaginatedType<PostIdType> = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: itemPost
        }

        return itemPostResponse

    },

    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string, blogName: string): Promise<PostIdType> {

        const newPost = {

            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()

        }

        const resultNewPost = await postCollection.insertOne(newPost)

        return {
            id: resultNewPost.insertedId.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt

        }

    },


    async findPostId(id: string): Promise<PostIdType | null> {

        const findPostForId = await postCollection.findOne({_id: new ObjectId(id)})

        if (findPostForId) {
            return {
                id: findPostForId._id.toString(),
                title: findPostForId.title,
                shortDescription: findPostForId.shortDescription,
                content: findPostForId.content,
                blogId: findPostForId.blogId,
                blogName: findPostForId.blogName,
                createdAt: findPostForId.createdAt
            }
        } else {
            return null
        }


    },
    async updatePostId(id: string, title: string, shortDescription: string, content: string,
                       blogId: string): Promise<boolean> {

        const updatePostForId = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId
                }
            })
        return updatePostForId.matchedCount === 1


    },


    async deletePostId(id: string): Promise<boolean> {

        const deletePostForId = await postCollection.deleteOne({_id: new ObjectId(id)})
        return deletePostForId.deletedCount === 1
    },

    async deletePostAll(): Promise<boolean> {
        const deletePost = await postCollection.deleteMany()
        return deletePost.deletedCount === 1

    }


}