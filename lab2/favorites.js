const FAVORITES_KEY = "favoriteBooks";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}
// adds a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.find(b => b.id === book.id)) {
    favorites.push(book);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(b => b.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}