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
    item: T[]
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



