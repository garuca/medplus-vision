export interface FreteOpcao {
  servico: string;
  empresa: string;
  preco: number;
  prazo: number;
}

interface MelhorEnvioProduct {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  quantity: number;
  insurance_value: number;
}

export interface FreteResultado {
  opcoes: FreteOpcao[];
  erro?: string;
}

export async function calcularFrete(
  cepDestino: string,
  cepOrigem: string,
  produtos: MelhorEnvioProduct[],
  token: string,
): Promise<FreteResultado> {
  if (!token) return { opcoes: [], erro: "Token do Melhor Envio não configurado" };

  try {
    const response = await fetch("/proxy-melhor-envio/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "MedPlus Hospitalar (contato@medplushospitalar.com.br)",
      },
      body: JSON.stringify({
        from: { postal_code: cepOrigem.replace(/\D/g, "") },
        to: { postal_code: cepDestino.replace(/\D/g, "") },
        products: produtos,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Frete API error:", response.status, text);
      return { opcoes: [], erro: `Erro ao consultar frete (HTTP ${response.status})` };
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Frete API unexpected response:", data);
      return { opcoes: [], erro: "Resposta inesperada da API de frete" };
    }

    const opcoes = data
      .filter((item: any) => item.custom_price && Number(item.custom_price) > 0)
      .map((item: any) => ({
        servico: item.name || item.id || "",
        empresa: item.company?.name || "",
        preco: Number(item.custom_price),
        prazo: Number(item.custom_delivery_time) || Number(item.delivery_time) || 0,
      }));

    if (opcoes.length === 0) {
      return { opcoes: [], erro: "Nenhuma transportadora disponível para este CEP" };
    }

    return { opcoes };
  } catch (err) {
    console.error("Frete fetch error:", err);
    return { opcoes: [], erro: "Erro de conexão ao consultar frete" };
  }
}

export function formatarFrete(preco: number): string {
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}
