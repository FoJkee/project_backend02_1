import dotenv from "dotenv"
import {MongoClient} from "mongodb";

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"

console.log(mongoUrl)

if(!mongoUrl){
    throw new Error('Not')
}

const client = new MongoClient(mongoUrl)


const db = client.db('network')

export async function runDb() {
    try {
        await client.connect()
        console.log('Connection success')
    }
    catch {
        await client.close()
        console.log("Can't connect to db")
    }



}