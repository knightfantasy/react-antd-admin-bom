export function convertSorterToObject(sorter: Record<string, 'ascend' | 'descend' | null>) {
  const sort = Object.entries(sorter).map(([key, value]) => {
    return value === 'descend' ? `-${key}` : key
  })
  return { sort }
}
