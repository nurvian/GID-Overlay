export default async function handler(req, res) {
  const response = await fetch("https://api.joshlei.com/v1/growagarden/stock");
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*"); // optional, tapi bagus ditambah
  res.status(200).json(data);
}
