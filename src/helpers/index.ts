/**
 * Manual pagination
 *
 * @param {number}  limit   the max amount of items in the slice
 * @param {number}  page    the page to retrieve
 * @param {Array}   data    the list of records to be paginated
 *
 * @returns {Array}        a slice of the array containing fewer records
 */

export const paginate = (limit: number, page: number, data: any): any => {
  const offset = (page - 1) * limit
  const newLimit = offset + limit
  return data.slice(offset, newLimit)
}

export const getArray = (item: Set<string>): string[] => Array.from(item)
