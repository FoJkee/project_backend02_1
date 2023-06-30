import {ObjectId} from "mongodb";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type BlogIdType = BlogType & { id: string }

export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string

}

export type PostIdType = PostType & { id: string }


export type PaginatedType<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T[]
}

export type QueryParamsBlog = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchNameTerm: string | null

}

export type QueryParamsPost = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export type UserDbType = {
    _id: ObjectId,
    login: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: string,

}

export type PublicUser = {id: string} & Omit<UserDbType, '_id' | 'passwordHash' | 'passwordSalt'>


export type QueryParamsUser = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}



