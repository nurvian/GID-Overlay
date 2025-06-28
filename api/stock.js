export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.joshlei.com/v2/growagarden/stock", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VercelBot/1.0)", // Tambahan penting
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      console.error("❌ Fetch failed:", response.status);
      return res.status(500).json({ error: "Failed to fetch data from source" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error caught in handler:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
