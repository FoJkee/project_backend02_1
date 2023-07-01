import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {runDb} from "./db";
import {blogRouter} from "./routing/blog-routing";
import {deleteRouter} from "./routing/testing-routing";
import {postRouter} from "./routing/post-routing";
import {authRouter} from "./routing/auth-routing";
import {userRouter} from "./routing/user-routing";


const app = express()

const port = 7001

const parseMiddleware = express.json()

app.use(bodyParser.json())
app.use(parseMiddleware)



app.use('/blogs', blogRouter)
app.use('/posts', postRouter)
app.use('/testing', deleteRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter)


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