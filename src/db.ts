import dotenv from "dotenv"
import {MongoClient, WithId} from "mongodb";
import {BlogType, PostType, PublicUser, UserDbType} from "./types";

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://0.0.0.0:27017"

console.log(mongoUrl)

if (!mongoUrl) {
    throw new Error('Not')
}

const client = new MongoClient(mongoUrl)

const db = client.db('network')

export const postCollection = db.collection<WithId<PostType>>('posts')
export const blogCollection = db.collection<WithId<BlogType>>('blogs')
export const usersCollection = db.collection<WithId<UserDbType>>('users')


export async function runDb() {
    try {
        await client.connect()
        console.log('Connection success')
    } catch {
        await client.close()
        console.log("Can't connect to db")
    }


}