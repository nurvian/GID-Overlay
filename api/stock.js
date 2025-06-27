export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.joshlei.com/v1/growagarden/stock");

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ API fetch error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
