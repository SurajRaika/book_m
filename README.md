# Book Management Website

You may have seen those book reader machines in libraries. Well, it's the same but much cheaper and can work with all devices (which support a browser, of course).

![Book Dashboard](https://github.com/SurajRaika/book_m/assets/103476230/a5ea2345-9234-4696-8cc6-7f6021cf7895)

![Scanner Working Using Mobile Camera](https://github.com/SurajRaika/book_m/assets/103476230/2098f27d-61f7-4d2d-825a-8549f4dd5aa0)

It has two parts:

1. **Receiver**: Here, you want to handle your books.
2. **Scanner**: This will scan and send book data to the receiver's dashboard.

![QR Code Photo](https://github.com/SurajRaika/book_m/assets/103476230/4b3e9913-9dde-4c58-a36c-eb382f825ba1)

To make it completely secure, the sender can only send book information if they scan the QR code from the receiver, which creates a separate room each time a new user joins as a receiver.

![Receiver Working Example](https://github.com/SurajRaika/book_m/assets/103476230/fdc77a7d-0749-4252-b189-d9edd1ef185e)

Here is a working example of the receiver.

## Features

- **Easy Book Management**: Manage your book collection with ease, with a user-friendly interface for adding, editing, and organizing books.
- **Secure Book Sharing**: Share your books securely with others by creating a unique QR code that allows authorized users to scan and send book data to your dashboard.
- **Cross-Platform Compatibility**: Works on all devices that support a web browser, making it accessible from computers, tablets, and smartphones.
- **Affordable Solution**: A cost-effective alternative to expensive book reader machines, making it accessible to a wider audience.

## How It Works

1. **Receiver Setup**: Visit the website and set up your receiver dashboard. You will be provided with a unique QR code.
2. **Scanner Setup**: On a separate device (e.g., smartphone), access the scanner interface.
3. **Book Scanning**: Use the scanner to scan the QR code from your receiver dashboard, establishing a secure connection. The receiver will automatically convert itself to the book dashboard page.
5. **Book Data Capture**: Point the scanner at the book you want to add, and it will capture the relevant information (title, author, cover image, etc.).
6. **Data Transfer**: The scanned book data will be securely transferred and displayed on your receiver dashboard.
7. **Book Management**: Manage your book collection on the receiver dashboard.

## Security Measures

- **Secure QR Code Connection**: The sender can only send book information after scanning the receiver's unique QR code, ensuring a secure connection.
- **Separate Rooms**: Each time a new user joins as a receiver, a separate room is created, preventing unauthorized access or data sharing.



