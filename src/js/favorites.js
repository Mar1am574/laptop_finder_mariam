import { getLaptops } from "./api.js";
import { getFavorites, saveFavorites } from "./storage.js";
import { setupSharedPage, renderLaptopCards, money, showError } from "./ui.js";

setupSharedPage();
const grid = document.querySelector("#favorite-grid");
const summary = document.querySelector("#favorite-summary");
try {
  const laptops = await getLaptops();
  const saved = laptops.filter(item => getFavorites().includes(item.id));
  const total = saved.reduce((sum, item) => sum + item.price, 0);
  const average = saved.length ? total / saved.length : 0;
  summary.innerHTML = `<p>${saved.length} saved laptop(s)</p><p>Total: <strong>${money(total)}</strong></p><p>Average price: <strong>${money(average)}</strong></p>
    <button id="clear-favorites" class="mt-3 rounded-xl border border-line px-4 py-2">Clear all favorites</button>`;
  renderLaptopCards(saved, grid);
  document.addEventListener("favoritesChanged", () => location.reload());
  document.querySelector("#clear-favorites").addEventListener("click", () => {
    saveFavorites([]); location.reload();
  });
} catch (error) { showError(grid, "Could not load favorites."); }
