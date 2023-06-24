import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {runDb} from "./db";
import {blogsRouter, postRouter} from "./setting";


const app = express()

const port = 4001

const parseMiddleware = express.json()

app.use(bodyParser())
app.use(parseMiddleware)
app.use('/blogs', blogsRouter)
app.use('/posts', postRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
const startApp = async () => {

    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)

    })

}
startApp()