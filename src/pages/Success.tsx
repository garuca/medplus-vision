import { Link } from "wouter";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { carregarPedidoPorId, atualizarPagamentoPedido } from "../lib/pedidos";

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (orderId) {
      carregarPedidoPorId(orderId).then((pedido) => {
        if (pedido) {
          setCodigo(pedido.codigo);
          if (pedido.pagamentoStatus === "pendente") {
            atualizarPagamentoPedido(orderId, "aprovado").catch(console.error);
          }
        }
      });
    }
  }, [orderId]);

  const handleWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=55556294896602&text=${encodeURIComponent(`Olá! Meu pedido ${codigo} foi aprovado pelo Mercado Pago.`)}`,
      "_blank",
    );
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Pagamento Aprovado!</h2>
        <p className="mt-2 text-muted-foreground">Seu pagamento foi processado com sucesso.</p>
        {codigo && (
          <div className="mt-6 glass-card p-4 inline-block">
            <p className="text-sm text-muted-foreground">Código do Pedido</p>
            <p className="text-2xl font-bold text-primary">{codigo}</p>
          </div>
        )}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <button
            onClick={handleWhatsApp}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            <MessageCircle className="h-5 w-5" /> Fale Conosco
          </button>
          <Link
            to="/meus-pedidos"
            className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            <ShoppingBag className="h-5 w-5" /> Meus Pedidos
          </Link>
          <Link
            to="/loja"
            className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </section>
  );
}
