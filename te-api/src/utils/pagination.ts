import { PageNumberCounters, PageNumberPagination } from 'prisma-extension-pagination/dist/types'

export function formatPagination(result: [any, PageNumberPagination & PageNumberCounters]) {
  const [data, meta] = result
  return {
    ...meta,
    data,
  }
}
