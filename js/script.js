// Google Books API Example
const booksContainer = document.getElementById('books');
const searchInput = document.getElementById('search-input');

async function fetchBooks(query = "fiction") {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
    const data = await response.json();
    displayBooks(data.items);
}

function displayBooks(books) {
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const info = book.volumeInfo;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x200';
        const title = info.title || 'No Title';
        const author = info.authors ? info.authors.join(', ') : 'Unknown Author';

        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-3', 'book-card');
        bookCard.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h5>${title}</h5>
      <p>${author}</p>
    `;
        booksContainer.appendChild(bookCard);
    });
}

// Initial fetch
fetchBooks();

// Search functionality
searchInput.addEventListener('keyup', (e) => {
    const query = e.target.value || "fiction";
    fetchBooks(query);
});
