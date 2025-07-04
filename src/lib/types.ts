export type PageParams<T> = {
  params: T
  searchParams: { [key: string]: string | string[] | undefined }
}

export type MoviePageParams = PageParams<{ id: string }>
