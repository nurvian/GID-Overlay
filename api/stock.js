export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.joshlei.com/v1/growagarden/stock");
    const contentType = response.headers.get("content-type");

    // Cek kalau bukan JSON, return error
    if (!contentType.includes("application/json")) {
      return res.status(500).json({ error: "Invalid content type", contentType });
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy fetch failed:", error);
    res.status(500).json({ error: "Proxy fetch failed", message: error.message });
  }
}
