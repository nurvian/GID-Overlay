let previousData = {};

async function fetchData() {
  try {
    const proxy = "https://corsproxy.io/?";
    const url = "https://api.joshlei.com/v1/growagarden/stock";
    const res = await fetch(proxy + encodeURIComponent(url));
    const data = await res.json();

    const categories = { stock: [], gear: [], egg: [] };

    for (const item of data) {
      if (item.item_id.startsWith("seed")) {
        categories.stock.push(item);
      } else if (item.item_id.startsWith("gear")) {
        categories.gear.push(item);
      } else if (item.item_id.startsWith("egg")) {
        categories.egg.push(item);
      }
    }

    renderOverlay(categories);
  } catch (err) {
    console.error("Failed to load overlay:", err);
    document.getElementById("overlay").innerHTML = "Failed to load data.";
  }
}

function renderOverlay(categories) {
  const container = document.getElementById("overlay");
  container.innerHTML = "";

  const catNames = {
    stock: "🥦 Stock Items",
    gear: "⚙️ Gear Items",
    egg: "🥚 Egg Items"
  };

  for (const [catKey, items] of Object.entries(categories)) {
    if (items.length === 0) continue;

    const catDiv = document.createElement("div");
    catDiv.className = "category";

    const title = document.createElement("h2");
    title.textContent = catNames[catKey];
    catDiv.appendChild(title);

    for (const item of items) {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = "";

      const name = document.createElement("span");
      name.textContent = `${item.display_name} ×${item.amount}`;

      itemDiv.appendChild(img);
      itemDiv.appendChild(name);

      // Cek perubahan jumlah
      const prevAmount = previousData[item.item_id];
      if (prevAmount !== undefined && prevAmount !== item.amount) {
        itemDiv.classList.add("updated");
      }

      previousData[item.item_id] = item.amount;
      catDiv.appendChild(itemDiv);
    }

    container.appendChild(catDiv);
  }
}

fetchData();
setInterval(fetchData, 30000); // update tiap 30 detik
