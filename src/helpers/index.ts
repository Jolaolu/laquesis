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

/**
 * @param {Set}  item   the set to get strings from;
 * @returns {Array}    an array of strings
 */
export const getArray = (item: Set<string>): string[] => Array.from(item)

/**
 * @param {string}  word   the word to convert to a number;
 * @returns {number}   the converted number
 */
export const convertToNumber = (word: string): number => parseInt(word)

export const combineArrays = (items: string[][]): string[] => {
  const newArray: string[] = []
  items.reduce((arr, item: string[]) => {
    newArray.push(...item)
    return arr
  }, newArray)
  return newArray
}
