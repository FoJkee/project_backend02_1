import express from "express";
import bodyParser from "body-parser";
import {runDb} from "./db";


const app = express()

const port = 4001

const parseMiddleware = express.json()

app.use(bodyParser())
app.use(parseMiddleware)


const startApp = async () => {

    await runDb()
    app.listen(port, () => {
        console.log(port)


    })

    startApp()


}