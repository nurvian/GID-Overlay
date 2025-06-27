let previousData = {};

const CATEGORY_NAMES = {
  seed_stock: "🌱 Seeds",
  gear_stock: "⚙️ Gears",
  egg_stock: "🥚 Eggs",
  cosmetic_stock: "🎨 Cosmetics",
  eventshop_stock: "🎁 Event Shop"
};

async function fetchData() {
  try {
    const res = await fetch("/api/stock");
    const data = await res.json();

    renderOverlay(data);
  } catch (err) {
    console.error("Failed to load overlay:", err);
    document.getElementById("overlay").innerHTML = "❌ Failed to load data.";
  }
}

function renderOverlay(data) {
  const container = document.getElementById("overlay");
  container.innerHTML = "";

  for (const [key, items] of Object.entries(data)) {
    // Lewatkan non-stock array
    if (!key.endsWith("_stock") || !Array.isArray(items)) continue;

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    const title = document.createElement("h2");
    title.textContent = CATEGORY_NAMES[key] || key;
    categoryDiv.appendChild(title);

    for (const item of items) {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = item.item_id;

      const name = document.createElement("span");
      name.textContent = `${item.display_name} ×${item.quantity}`;

      itemDiv.appendChild(img);
      itemDiv.appendChild(name);

      const prev = previousData[item.item_id];
      if (prev !== undefined && prev !== item.quantity) {
        itemDiv.classList.add("updated");
      }

      previousData[item.item_id] = item.quantity;
      categoryDiv.appendChild(itemDiv);
    }

    container.appendChild(categoryDiv);
  }
}

fetchData();
setInterval(fetchData, 30000); // update every 30 sec
