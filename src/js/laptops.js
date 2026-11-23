import { getLaptops } from "./api.js";
import { setupSharedPage, renderLaptopCards, showError } from "./ui.js";

setupSharedPage();
const grid = document.querySelector("#laptop-grid");
const count = document.querySelector("#result-count");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const maxPrice = document.querySelector("#max-price");
const minRam = document.querySelector("#min-ram");
const sort = document.querySelector("#sort");
let allLaptops = [];

function updateLaptops() {
  const word = search.value.toLowerCase();
  let results = allLaptops.filter(item =>
    (item.name.toLowerCase().includes(word) || item.brand.toLowerCase().includes(word)) &&
    (!category.value || item.category === category.value) &&
    (!maxPrice.value || item.price <= Number(maxPrice.value)) &&
    (!minRam.value || item.ramGB >= Number(minRam.value))
  );
  const [field, direction] = sort.value.split("-");
  results = [...results].sort((a, b) => (a[field] - b[field]) * (direction === "desc" ? -1 : 1));
  count.textContent = `${results.length} laptop(s) found`;
  renderLaptopCards(results, grid);
}
try {
  grid.innerHTML = Array.from({length:6}, () => `<div class="h-72 animate-pulse rounded-2xl bg-panel"></div>`).join("");
  allLaptops = await getLaptops();
  [search, category, maxPrice, minRam, sort].forEach(control => control.addEventListener("input", updateLaptops));
  updateLaptops();
} catch (error) { showError(grid, "Could not load laptops. Open this project using VS Code Live Server."); }
