import {Filter, ObjectId, WithId} from "mongodb";
import {PaginatedType, PublicUser, UserDbType} from "../types";
import {usersCollection} from "../db";


export const repositoryUser = {

    async findUser(pageNumber: number,
                   pageSize: number,
                   sortBy: string,
                   sortDirection: string,
                   searchLoginTerm: string,
                   searchEmailTerm: string): Promise<PaginatedType<PublicUser>> {

        const filter: Filter<UserDbType> = ({
            login: {
                $regex: searchLoginTerm ?? '',
                $options: 'i'
            } || {
                email: {
                    $regex: searchEmailTerm ?? '',
                    $options: "i"
                }
            }
        })

        const findForUser = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection = 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(+pageSize)
            .toArray()

        const itemUser: PublicUser[] = findForUser.map(el => ({
            id: el._id.toString(),
            email:el.email,
            login: el.login,
            createdAt: el.createdAt
        }))

        const pageCount: number = await usersCollection.countDocuments(filter)
        const totalCount: number = Math.ceil(pageCount / pageSize)

        const itemUserResponse: PaginatedType<PublicUser> = {
            pagesCount: pageCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: itemUser
        }
        return itemUserResponse

    },

    async createUser(userCreate: WithId<UserDbType>): Promise<PublicUser> {

        const resultUser = await usersCollection.insertOne(userCreate)
        return {
            id: resultUser.insertedId.toString(),
            login: userCreate.login,
            email: userCreate.email,
            createdAt: userCreate.createdAt
        }

    },

    async findUserById(id: string): Promise<PublicUser | null> {
        let findUserId = await usersCollection.findOne({_id: new ObjectId(id)})

        if (findUserId) {
            return {
                id: findUserId._id.toString(),
                login: findUserId.login,
                email: findUserId.email,
                createdAt: findUserId.createdAt

            }
        } else {

            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({
            $or: [{email: loginOrEmail}, {login: loginOrEmail}]
        })
        return user

    },

    async deleteUserForId(id: string): Promise<boolean> {

        const deleteUser = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deleteUser.deletedCount === 1
    }


}