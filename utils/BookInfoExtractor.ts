import { parse, HTMLElement } from 'node-html-parser';

interface BookInfo {
  title: string;
  author: string;
  publisher: string;
  published: string;
  imageSrc: string;
}

export default  async function (isbn_number: number): Promise<BookInfo | string> {
  try {
    const jepHTMLData = await $fetch<string>(`httpds://isbnsearch.org/isbn/${isbn_number}`);
    const root = parse(jepHTMLData);
    const bookContainer: HTMLElement | null = root.getElementById("book");

    if (bookContainer) {
      const bookInfo: BookInfo = {
        title: (bookContainer.querySelector(".bookinfo h1")?.textContent || '').trim(),
        author: ((bookContainer.querySelector(".bookinfo p:nth-of-type(3)")?.textContent || '').split(':')[1] || '').trim(),
        publisher: ((bookContainer.querySelector(".bookinfo p:nth-of-type(6)")?.textContent || '').split(':')[1] || '').trim(),
        published: ((bookContainer.querySelector(".bookinfo p:nth-of-type(7)")?.textContent || '').split(':')[1] || '').trim(),
        imageSrc: bookContainer.querySelector(".image img")?.getAttribute("src") || ''
      };
      return bookInfo;
    } else {
      return '';
    }
  } catch (error) {
    console.error("Error occurred while fetching book data:", error);
    return '';
  }
}



