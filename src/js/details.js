import { getLaptops } from "./api.js";
import { getFavorites, toggleFavorite } from "./storage.js";
import { setupSharedPage, money, showError } from "./ui.js";

setupSharedPage();
const area = document.querySelector("#details-content");
try {
  const laptops = await getLaptops();
  const id = Number(new URLSearchParams(location.search).get("id"));
  const laptop = laptops.find(item => item.id === id);
  if (!laptop) {
    showError(area, "Laptop not found. Please return to the catalogue.");
  } else {
    const rows = [
      ["Brand", laptop.brand], ["Category", laptop.category], ["Price", money(laptop.price)],
      ["CPU", laptop.cpu], ["RAM", `${laptop.ramGB} GB`], ["Storage", `${laptop.storageGB} GB`],
      ["Battery life", `${laptop.batteryHours} hours`], ["Weight", `${laptop.weightKg} kg`],
      ["Screen size", `${laptop.screenInches} inches`], ["Description", laptop.description]
    ];
    area.innerHTML = `
      <div class="grid gap-8 md:grid-cols-2">
        <img src="${laptop.image}" alt="${laptop.name}" class="w-full rounded-2xl object-cover">
        <div><p class="text-sm text-muted">${laptop.brand} · ${laptop.category}</p>
        <h1 class="mt-2 text-3xl font-bold">${laptop.name}</h1>
        <p class="mt-3 text-2xl font-bold text-accent">${money(laptop.price)}</p>
        <p class="mt-4 text-muted">${laptop.description}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <button id="detail-favorite" class="btn-action">${getFavorites().includes(id) ? "♥ Remove favorite" : "♡ Add to favorites"}</button>
          <button id="detail-compare" class="rounded-xl border border-line px-4 py-2 font-semibold">Add to compare</button>
        </div></div></div>
        <section class="mt-10"><h2 class="mb-4 text-2xl font-bold">Full specifications</h2>
        <div class="overflow-x-auto rounded-2xl border border-line"><table class="w-full text-left">
        <tbody>${rows.map(([key,value]) => `<tr class="border-b border-line"><th class="bg-panel p-3">${key}</th><td class="p-3">${value}</td></tr>`).join("")}</tbody>
        </table></div></section>`;
    document.querySelector("#detail-favorite").addEventListener("click", () => {
      toggleFavorite(id); location.reload();
    });
    document.querySelector("#detail-compare").addEventListener("click", () => {
      let selected = JSON.parse(localStorage.getItem("compareSelection")) || [];
      if (!getFavorites().includes(id)) toggleFavorite(id);
      if (!selected.includes(id)) {
        if (selected.length >= 4) { alert("You can compare up to four laptops."); return; }
        selected.push(id);
      }
      localStorage.setItem("compareSelection", JSON.stringify(selected));
      location.href = "compare.html";
    });
  }
} catch (error) { showError(area, "Could not load laptop details. Please use Live Server."); }
