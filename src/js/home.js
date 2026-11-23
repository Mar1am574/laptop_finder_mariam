import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { setupSharedPage, money, showError } from "./ui.js";

setupSharedPage();
const stats = document.querySelector("#home-stats");
try {
  const laptops = await getLaptops();
  const lowest = laptops.reduce((min, item) => item.price < min ? item.price : min, laptops[0].price);
  stats.innerHTML = `
    <div class="rounded-2xl bg-panel p-6"><p class="text-muted">Available laptops</p><p class="mt-2 text-3xl font-bold">${laptops.length}</p></div>
    <div class="rounded-2xl bg-panel p-6"><p class="text-muted">Lowest price</p><p class="mt-2 text-3xl font-bold">${money(lowest)}</p></div>
    <div class="rounded-2xl bg-panel p-6"><p class="text-muted">Saved favorites</p><p class="mt-2 text-3xl font-bold">${getFavorites().length}</p></div>`;
} catch (error) { showError(stats, "Laptop data could not load. Please run the project with Live Server."); }
