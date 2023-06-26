import {ObjectId, WithId} from "mongodb";
import {postCollection} from "../db";
import {PostIdType, PostType} from "../types";
import {postRouter} from "../setting";

export const repositoryPost = {





    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string, blogName: string) {

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
            id: resultNewPost.insertedId.id,
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