import BookInfoExtractor from '~/utils/BookInfoExtractor';


export default defineEventHandler(async () => {
return  BookInfoExtractor(9789351342663) ;
})