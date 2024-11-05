import { PageNumberCounters, PageNumberPagination } from 'prisma-extension-pagination/dist/types'

export function formatPagination<T = any>(result: [T, PageNumberPagination & PageNumberCounters], limit: number) {
  const [data, meta] = result
  return {
    limit: +limit || 10,
    page: meta?.currentPage,
    pages: meta?.pageCount,
    total: meta?.totalCount,
    list: data,
  }
}

export function paginate(limit: number, page: number) {
  return {
    limit: +limit || 10,
    page: +page || 1,
  }
}
