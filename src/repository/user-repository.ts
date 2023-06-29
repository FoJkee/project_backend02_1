import {Filter, ObjectId, WithId} from "mongodb";
import {PaginatedType, UserIdType, UserType} from "../types";
import {usersCollection} from "../db";


export const repositoryUser = {

    async findUser(sortBy: string, sortDirection: string, pageNumber: number, pageSize: number, searchLoginTerm: string,
                   searchEmailTerm: string): Promise<PaginatedType<UserIdType>> {

        const filter: Filter<UserType> = ({
            login: {
                $regex: searchLoginTerm ?? '',
                $options: 'i'
            } || {email: {$regex: searchEmailTerm ?? '', $options: "i"}}
        })

        const findForUser = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection = 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
            .toArray()

        const itemUser: UserIdType[] = findForUser.map(el => ({
            id: el._id.toString(),
            login: el.login,
            email: el.email,
            createdAt: el.createdAt
        }))

        const pageCount: number = await usersCollection.countDocuments(filter)
        const totalCount: number = Math.ceil(pageCount / pageSize)

        const itemUserResponse = {
            pagesCount: pageCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            item: itemUser
        }
        return itemUserResponse

    },

    async createUser(userCreate: WithId<UserType>): Promise<UserType> {

        const resultUser = await usersCollection.insertOne(userCreate)
        return userCreate

    },

    async findUserById(id: ObjectId): Promise<UserType | null> {
        let findUser = await usersCollection.findOne({_id: id})

        if (findUser) {
            return findUser
        } else {
            return null
        }

    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({
            $or: [{email: loginOrEmail}, {userName: loginOrEmail}]
        })
        return user

    }


}