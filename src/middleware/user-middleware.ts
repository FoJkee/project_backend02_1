import {body} from "express-validator";

const patternLogin = '^[a-zA-Z0-9_-]*$'
const patternEmail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n'


export const userMiddleware = [
    body('login').exists().isString().isLength({min: 3, max: 10}).withMessage('Incorrect login').matches(patternLogin).withMessage('Incorrect login'),
    body('password').exists().isString().isLength({min: 6, max: 20}).withMessage('Incorrect password'),
    body('email').exists().isString().withMessage('Incorrect email').matches(patternEmail).withMessage('Incorrect email')

]