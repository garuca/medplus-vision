import { CreditCard, Shield } from "lucide-react";

interface MercadoPagoCheckoutProps {
  amount: number;
}

export function MercadoPagoCheckout({ amount }: MercadoPagoCheckoutProps) {
  const handleCheckout = () => {
    alert("Checkout Mercado Pago em desenvolvimento. Configure sua Public Key para ativar.");
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCheckout}
        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <CreditCard className="h-5 w-5" />
        Comprar Agora
      </button>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Pagamento seguro via Mercado Pago</span>
      </div>
    </div>
  );
}
