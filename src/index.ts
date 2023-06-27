import express, {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {runDb} from "./db";
import {blogRouter} from "./routing/blog-routing";
import {deleteRouter} from "./routing/testing-routing";
import {postRouter} from "./routing/post-routing";


const app = express()

const port = 7001

const parseMiddleware = express.json()

app.use(bodyParser.json())
app.use(parseMiddleware)



app.use('/blogs', blogRouter)
app.use('/posts', postRouter)
app.use('/testing', deleteRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello!')

})
const startApp = async () => {

    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)

    })

}
startApp()