import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Shield, Loader2 } from "lucide-react";
import { MP_CONFIG } from "../lib/mercadopago";
import { ItemCarrinho } from "../context/CartContext";

interface MercadoPagoCheckoutProps {
  amount: number;
  items: ItemCarrinho[];
  customerEmail?: string;
}

interface MPItem {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
}

export function MercadoPagoCheckout({ amount, items, customerEmail }: MercadoPagoCheckoutProps) {
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!initialized) {
        initMercadoPago(MP_CONFIG.publicKey);
        setInitialized(true);
      }
    };
    init();
  }, [initialized]);

  useEffect(() => {
    const createPreference = async () => {
      if (!customerEmail) {
        setLoading(false);
        return;
      }

      try {
        const total = items.reduce((acc, item) => {
          const price = item.produto.precoPromocional || item.produto.preco;
          return acc + price * item.quantidade;
        }, 0);

        const origin = window.location.origin;

        const body = {
          items: [
            {
              id: "cart-total",
              title: "Compra na MedPlus Vision",
              description: `Pagamento de ${items.length} itens`,
              quantity: 1,
              unit_price: total,
            },
          ],
          payer: {
            email: customerEmail,
          },
          back_urls: {
            success: origin + "/success",
            failure: origin + "/checkout?erro=pagamento",
            pending: origin + "/checkout?status=pending",
          },
        };

        console.log("MP Request:", JSON.stringify(body, null, 2));

        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MP_CONFIG.accessToken}`,
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log("MP Response:", data);

        if (!response.ok) {
          setLoading(false);
          return;
        }

        if (data.id) {
          setPreferenceId(data.id);
        }
      } catch (error) {
        console.error("Erro ao criar preferência:", error);
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0 && amount > 0) {
      createPreference();
    }
  }, [items, amount, customerEmail]);

  return (
    <div className="space-y-3">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      )}

      {!loading && preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Pagamento seguro via Mercado Pago</span>
      </div>
    </div>
  );
}

export function MercadoPagoBadge({ text = "Pagamento Seguro" }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#009EE3" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 8.5h2.333v7h-2.333V8.5zm4.667 0h2.333v7h-2.333V8.5z"
          fill="white"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
}
