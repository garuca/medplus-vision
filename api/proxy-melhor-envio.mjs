export default async function handler(req, res) {
  const path = req.query.path || "";
  const url = `https://melhorenvio.com.br/${path}`;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: req.headers.authorization || "",
    "User-Agent":
      req.headers["user-agent"] || "MedPlus Hospitalar (contato@medplushospitalar.com.br)",
  };

  const body =
    req.method !== "GET" && req.method !== "HEAD" && req.body
      ? JSON.stringify(req.body)
      : undefined;

  try {
    const response = await fetch(url, {
      method: req.method || "POST",
      headers,
      body,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Erro ao consultar o Melhor Envio" });
  }
}
