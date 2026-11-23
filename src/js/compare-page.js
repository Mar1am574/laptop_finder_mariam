import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { setupSharedPage, money, showError } from "./ui.js";
import { isBestValue } from "./compare.js";

setupSharedPage();
const area = document.querySelector("#compare-content");
try {
  const all = await getLaptops();
  const favoriteLaptops = all.filter(item => getFavorites().includes(item.id));
  let selected = JSON.parse(localStorage.getItem("compareSelection")) || [];
  selected = selected.filter(id => getFavorites().includes(id));
  if (!selected.length) selected = favoriteLaptops.slice(0, 4).map(item => item.id);
  function draw() {
    const chosen = all.filter(item => selected.includes(item.id));
    const options = favoriteLaptops.map(item => `<label class="mr-4 inline-flex items-center gap-2"><input type="checkbox" value="${item.id}" ${selected.includes(item.id) ? "checked" : ""} class="compare-check"> ${item.name}</label>`).join("");
    const fields = [
      ["Price", "price", true, money], ["CPU", "cpu", false, v => v],
      ["RAM", "ramGB", false, v => `${v} GB`], ["Storage", "storageGB", false, v => `${v} GB`],
      ["Battery life", "batteryHours", false, v => `${v} h`], ["Weight", "weightKg", true, v => `${v} kg`],
      ["Screen", "screenInches", false, v => `${v} inches`]
    ];
    area.innerHTML = `<div class="mb-6 rounded-2xl bg-panel p-4"><p class="mb-3 font-semibold">Choose 2 to 4 of your favorites:</p>${options}<p id="compare-message" class="mt-3 text-sm text-muted">Selected: ${chosen.length}</p></div>
      ${chosen.length < 2 ? `<p class="rounded-xl bg-panel p-6">Please select at least two favorite laptops to compare.</p>` :
      `<div class="overflow-x-auto rounded-2xl border border-line"><table class="min-w-full text-left"><thead><tr><th class="bg-panel p-3">Specification</th>${chosen.map(item => `<th class="min-w-40 p-3">${item.name}</th>`).join("")}</tr></thead><tbody>
      ${fields.map(([label,field,low,format]) => `<tr class="border-t border-line"><th class="bg-panel p-3">${label}</th>${chosen.map(item => `<td class="p-3 ${isBestValue(chosen,item,field,low) ? "bg-green-100 font-bold text-green-900" : ""}">${format(item[field])}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div>`}`;
    area.querySelectorAll(".compare-check").forEach(check => check.addEventListener("change", () => {
      const id = Number(check.value);
      if (check.checked && selected.length >= 4) {
        check.checked = false;
        document.querySelector("#compare-message").textContent = "You can select a maximum of four laptops.";
        return;
      }
      selected = check.checked ? [...selected, id] : selected.filter(value => value !== id);
      localStorage.setItem("compareSelection", JSON.stringify(selected));
      draw();
    }));
  }
  draw();
} catch (error) { showError(area, "Could not load the comparison."); }
