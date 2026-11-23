import { getFavorites, toggleFavorite, getTheme, saveTheme } from "./storage.js";

export const money = price => `${Number(price).toLocaleString()} EGP`;

export function showError(element, message) {
  element.innerHTML = `<p class="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">${message}</p>`;
}

export function renderLaptopCards(laptops, container) {
  if (!laptops.length) {
    container.innerHTML = `<p class="col-span-full rounded-xl bg-panel p-6 text-center text-muted">No laptops match your search.</p>`;
    return;
  }
  container.innerHTML = laptops.map(laptop => {
    const saved = getFavorites().includes(laptop.id);
    return `
      <article class="laptop-card">
        <img src="${laptop.image}" alt="${laptop.name}" class="mb-4 h-40 w-full rounded-xl object-cover" onerror="this.src='https://placehold.co/640x420?text=Laptop'">
        <p class="text-sm text-muted">${laptop.brand} · ${laptop.category}</p>
        <h3 class="mt-1 text-lg font-bold">${laptop.name}</h3>
        <p class="mt-2 text-xl font-bold text-accent">${money(laptop.price)}</p>
        <p class="mt-2 text-sm text-muted">${laptop.cpu} · ${laptop.ramGB}GB RAM · ${laptop.storageGB}GB SSD</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <a class="btn-action" href="details.html?id=${laptop.id}">View details</a>
          <button class="rounded-xl border border-line px-3 py-2 font-semibold hover:bg-surface" data-favorite="${laptop.id}">${saved ? "♥ Saved" : "♡ Save"}</button>
        </div>
      </article>`;
  }).join("");
  container.querySelectorAll("[data-favorite]").forEach(button => {
    button.addEventListener("click", () => {
      toggleFavorite(Number(button.dataset.favorite));
      renderLaptopCards(laptops, container);
      document.dispatchEvent(new Event("favoritesChanged"));
    });
  });
}

export function setupTheme() {
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme === "performance" ? "performance" : "battery";
    const button = document.querySelector("#theme-toggle");
    if (button) button.textContent = theme === "performance" ? "☀ Battery Saver" : "🌙 Performance";
    saveTheme(theme);
  };
  applyTheme(getTheme());
  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    applyTheme(getTheme() === "battery" ? "performance" : "battery");
  });
}

export function setupMenu() {
  const button = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#nav-links");
  button?.addEventListener("click", () => menu.classList.toggle("hidden"));
}

export function setupSharedPage() {
  setupTheme();
  setupMenu();
}
