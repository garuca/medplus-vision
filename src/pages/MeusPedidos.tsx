import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { carregarPedidosUsuario } from "../lib/pedidos";
import type { Pedido } from "../types/admin";

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  pendente: { label: "Pendente", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  processando: { label: "Processando", icon: Package, color: "bg-blue-100 text-blue-700" },
  enviado: { label: "Enviado", icon: Truck, color: "bg-purple-100 text-purple-700" },
  entregue: { label: "Entregue", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  cancelado: { label: "Cancelado", icon: XCircle, color: "bg-red-100 text-red-700" },
};

const pagamentoLabels: Record<string, string> = {
  aguardando: "Aguardando",
  pendente: "Pendente",
  aprovado: "Aprovado",
  recusado: "Recusado",
  cancelado: "Cancelado",
};

export default function MeusPedidos() {
  const { user, loading: authLoading } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      carregarPedidosUsuario(user.id)
        .then(setPedidos)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Faça login</h2>
          <p className="text-muted-foreground mb-6">Entre para visualizar seus pedidos</p>
          <Link
            to="/login"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Entrar
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

        {pedidos.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum pedido encontrado</p>
            <Link
              to="/loja"
              className="btn-primary mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => {
              const StatusIcon = statusConfig[pedido.status]?.icon || Clock;
              return (
                <div
                  key={pedido.id}
                  className="glass-card p-4 cursor-pointer hover:bg-white/80 transition-colors"
                  onClick={() => setSelectedPedido(pedido)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">#{pedido.codigo}</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            statusConfig[pedido.status]?.color || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[pedido.status]?.label || pedido.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {pedido.produtos.length} item(ns) — R${" "}
                        {pedido.total.toFixed(2).replace(".", ",")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(pedido.createdAt).toLocaleDateString("pt-BR")} — Pagamento:{" "}
                        {pagamentoLabels[pedido.pagamentoStatus] || pedido.pagamentoStatus}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="glass-card p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Pedido #{selectedPedido.codigo}</h3>
              <button
                onClick={() => setSelectedPedido(null)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    statusConfig[selectedPedido.status]?.color || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statusConfig[selectedPedido.status]?.label || selectedPedido.status}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  <AlertCircle className="h-3 w-3" />
                  Pagamento:{" "}
                  {pagamentoLabels[selectedPedido.pagamentoStatus] ||
                    selectedPedido.pagamentoStatus}
                </span>
              </div>

              {selectedPedido.endereco && (
                <div>
                  <p className="text-sm font-medium mb-1">Endereço de Entrega</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPedido.endereco.endereco}, {selectedPedido.endereco.numero}
                    {selectedPedido.endereco.complemento &&
                      ` - ${selectedPedido.endereco.complemento}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPedido.endereco.bairro}, {selectedPedido.endereco.cidade} -{" "}
                    {selectedPedido.endereco.estado}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CEP: {selectedPedido.endereco.CEP}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Produtos</p>
                <div className="space-y-2">
                  {selectedPedido.produtos.map((produto, i) => (
                    <div key={i} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{produto.nome}</p>
                        <p className="text-xs text-muted-foreground">Qtd: {produto.quantidade}</p>
                      </div>
                      <p className="text-sm font-medium">
                        R$ {(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="text-xl font-bold text-primary">
                    R$ {selectedPedido.total.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
