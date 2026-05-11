export const handler = async (event) => {
  const path = event.queryStringParameters?.path || "";
  const url = `https://melhorenvio.com.br/${path}`;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: event.headers?.authorization || "",
    "User-Agent":
      event.headers?.["user-agent"] || "MedPlus Hospitalar (contato@medplushospitalar.com.br)",
  };

  let body;
  if (event.body) {
    try {
      body = JSON.stringify(JSON.parse(event.body));
    } catch {
      body = event.body;
    }
  }

  try {
    const response = await fetch(url, {
      method: event.httpMethod || "POST",
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

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Erro ao consultar o Melhor Envio" }),
    };
  }
};
