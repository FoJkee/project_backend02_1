import {PublicUser} from "../types";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {repositoryUser} from "../repository/user-repository";


export const usersServise = {

    async createUser(login: string, email: string, password: string): Promise<PublicUser> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)


        const userCreate = {
            _id: new ObjectId(),
            login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        return repositoryUser.createUser(userCreate)

    },


    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {
        const user = await repositoryUser.findByLoginOrEmail(loginOrEmail)
        if (!user) return false

        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {

            return false
        }
        return true
    },


    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash

    },


}