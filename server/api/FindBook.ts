import { defineEventHandler, getQuery } from 'h3'
import BookInfoExtractor from '~/utils/BookInfoExtractor'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const isbn = query.isbn

  if (!isbn) {
    return { error: 'ISBN query parameter is required' }
  }

  try {
    const isbnNumber = parseInt(isbn, 10);
    const bookData = await BookInfoExtractor(isbnNumber)
    return bookData
  } catch (error) {
    return { error: 'Error fetching book data' }
  }
})
