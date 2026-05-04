import { useState } from "react";
import { CreditCard } from "lucide-react";

interface MercadoPagoPaymentFormProps {
  amount: number;
  onPayment?: () => void;
}

interface MercadoPagoBadgeProps {
  text?: string;
}

export function MercadoPagoPaymentForm({ amount, onPayment }: MercadoPagoPaymentFormProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    if (onPayment) {
      onPayment();
    }
    setTimeout(() => {
      setLoading(false);
      alert(
        "Funcionalidade de pagamento Mercado Pago em desenvolvimento. Configure sua Public Key no código.",
      );
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
    >
      <CreditCard className="h-4 w-4" />
      {loading ? "Processando..." : `Pagar R$ ${amount.toFixed(2)}`}
    </button>
  );
}

export function MercadoPagoBadge({ text = "Pagamento Seguro" }: MercadoPagoBadgeProps) {
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
