export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type BlogIdType = BlogType & {id: string}


export type PaginatedType<T> = {
    pagesCount: number,
    page: number,
    totalCount: number,
    item:T[]
}

export type QueryParamsBlog = {
    sortBy: string,
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number
}
export type QueryParamsBlogView = QueryParamsBlog  & {searchNameTerm: string | null}
