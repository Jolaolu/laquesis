import dayjs from 'dayjs'
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

/**
 * @param {Array}  items   an array of chunks of arrays
 * @returns {Array}   a single array of the combined chunks
 */
export const combineArrays = (items: string[][]): string[] => {
  const newArray: string[] = []
  items.reduce((arr, item: string[]) => {
    newArray.push(...item)
    return arr
  }, newArray)
  return newArray
}

export const getFormattedDate = (date: string): string => dayjs(date).format('DD/MM/YYYY')
