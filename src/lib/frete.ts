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

export async function calcularFrete(
  cepDestino: string,
  cepOrigem: string,
  produtos: MelhorEnvioProduct[],
  token: string,
): Promise<FreteOpcao[]> {
  if (!token) return [];

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

    if (!response.ok) return [];

    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data
      .filter((item: any) => item.custom_price && Number(item.custom_price) > 0)
      .map((item: any) => ({
        servico: item.name || item.id || "",
        empresa: item.company?.name || "",
        preco: Number(item.custom_price),
        prazo: Number(item.custom_delivery_time) || Number(item.delivery_time) || 0,
      }));
  } catch {
    return [];
  }
}

export function formatarFrete(preco: number): string {
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}
