// lab2/main.js
import { fetchBooks } from "../lab3/fetchBooks.js";
import { addFavorite, getFavorites, removeFavorite } from "../lab2/favorites.js";

const gridEl = document.getElementById("grid");
const statusEl = document.getElementById("status");

// Render book cards
function renderBooks(books, allowFavorites = true) {
  gridEl.innerHTML = "";
  if (!books.length) {
    statusEl.textContent = "No books found.";
    return;
  }
  statusEl.textContent = "";

  for (const book of books) {
    const card = document.createElement("div");
    card.className = "bg-[#1a120d] border border-gray-800 rounded-lg p-4 flex flex-col items-center";
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="w-32 h-44 object-cover rounded-md mb-3">
      <h3 class="text-sm font-semibold text-white mb-1 text-center">${book.title}</h3>
      <p class="text-xs text-gray-400 mb-2">${book.author}</p>
      ${allowFavorites
        ? `<button class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs">Add to Favorites</button>`
        : `<button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Remove</button>`}
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      if (allowFavorites) {
        addFavorite(book);
        alert(`${book.title} added to favorites!`);
      } else {
        removeFavorite(book.id);
        card.remove();
      }
    });

    gridEl.appendChild(card);
  }
}

// homepage initialization (search + display)
export async function initHome() {
  const searchForm = document.querySelector("form");
  const searchInput = document.getElementById("searchInput");

  // Load default books
  statusEl.textContent = "Loading books...";
  const defaultBooks = await fetchBooks();
  renderBooks(defaultBooks);

  // Handle search
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
    const query = searchInput.value.trim();
    if (!query) return;

    statusEl.textContent = "Searching...";
    const books = await fetchBooks(query);
    renderBooks(books);
  });
}


// Favorites page initialization
export function initFavoritesPage() {
  const favorites = getFavorites();
  renderBooks(favorites, false);
}
