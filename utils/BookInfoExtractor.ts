import { parse, HTMLElement } from 'node-html-parser';

interface BookInfo {
  title: string;
  author: string;
  imageSrc: string;
}



// You Can Use Your Own Database Or isbnsearch.org Api which will cost monthly 
const books: { [key: string]: BookInfo } = {
  "9780451524935": {
    title: '1984',
    author: 'George Orwell',
    imageSrc: 'https://images.isbndb.com/covers/49/35/9780451524935.jpg'
  },
  "9780060935467": {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    imageSrc: 'https://images.isbndb.com/covers/54/67/9780060935467.jpg'
  },
  "9780743273565": {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    imageSrc: 'https://images.isbndb.com/covers/35/65/9780743273565.jpg'
  },
  "9780399590504": {
    title: 'Educated: A Memoir',
    author: 'Tara Westover',
    imageSrc: 'https://images.isbndb.com/covers/05/04/9780399590504.jpg'
  },
  "9781400052189": {
    title: 'The Immortal Life of Henrietta Lacks',
    author: 'Rebecca Skloot',
    imageSrc: 'https://images.isbndb.com/covers/21/89/9781400052189.jpg'
  },
  "9789351342663": {
    title: 'Bharat Ki Rajvyavastha',
    author: 'M Laxmikanth',
    imageSrc: 'https://images.isbndb.com/covers/26/63/9789351342663.jpg'
  }
};

export default async function fetchBookInfo(isbn_number: number): Promise<BookInfo | string> {
  const isbn = isbn_number.toString();
  const bookInfo = books[isbn];

  if (bookInfo) {
    return bookInfo;
  } else {
    return `Book with ISBN number ${isbn} not found.`;
  }
}








  // try {
  //   // Fetch HTML data
  //   const jepHTMLData = await $fetch<string>(`https://isbnsearch.org/isbn/${isbn_number}`);
    
  //   // Check if HTML data is empty
  //   if (!jepHTMLData) {
  //     console.error("Empty HTML data received.");
  //     return '';
  //   }

  //   // Parse HTML
  //   const root = parse(jepHTMLData);

  //   // Find book container
  //   const bookContainer: HTMLElement | null = root.getElementById("book");

  //   if (bookContainer) {
  //     // Extract book information
  //     const bookInfo: BookInfo = {
  //       title: (bookContainer.querySelector(".bookinfo h1")?.textContent || '').trim(),
  //       author: ((bookContainer.querySelector(".bookinfo p:nth-of-type(3)")?.textContent || '').split(':')[1] || '').trim(),
  //       publisher: ((bookContainer.querySelector(".bookinfo p:nth-of-type(6)")?.textContent || '').split(':')[1] || '').trim(),
  //       published: ((bookContainer.querySelector(".bookinfo p:nth-of-type(7)")?.textContent || '').split(':')[1] || '').trim(),
  //       imageSrc: bookContainer.querySelector(".image img")?.getAttribute("src") || ''
  //     };
  //     return bookInfo;
  //   } else {
  //     console.error("Book container not found in HTML data.");
  //     return '';
  //   }
  // } catch (error) {
  //   console.error("Error occurred while fetching book data:", error);
  //   return '';
  // }