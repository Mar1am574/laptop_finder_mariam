const FAVORITES_KEY = "studentLaptopFavorites";
const THEME_KEY = "studentLaptopTheme";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}
export function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
export function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) favorites = favorites.filter(item => item !== id);
  else favorites.push(id);
  saveFavorites(favorites);
  return favorites;
}
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "battery";
}
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
