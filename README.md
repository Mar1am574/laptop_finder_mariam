# Student Laptop Finder

## 1. Open the folder
Open `laptop_finder_mariam` in Visual Studio Code.

## 2. Install the packages
Open Terminal in VS Code and run:

```bash
npm install
```

## 3. Build Tailwind CSS
Run:

```bash
npm run build
```

To keep Tailwind rebuilding while you edit files, use:

```bash
npm run watch
```

## 4. Run the website
Install the **Live Server** extension in VS Code if you do not already have it.
Right-click `index.html` and choose **Open with Live Server**.

Important: Do not open the HTML file by double-clicking it. The app uses `fetch()` to read `data/laptops.json`, and it needs a local server.

## Pages
- `index.html` – home page and live statistics
- `laptops.html` – search, filters, sorting, and laptop cards
- `details.html?id=1` – laptop details
- `favorites.html` – saved laptops, total, and average price
- `compare.html` – compare two to four saved laptops

## Data and saved information
Laptop information is in `data/laptops.json`.
Favorites, comparison selection, and theme are saved in the browser's localStorage.




