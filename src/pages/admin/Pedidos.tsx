import { useState } from "react";
import { ShoppingCart, Search, Filter, Eye, Package, Clock, CheckCircle, XCircle, Truck, ChevronDown } from "lucide-react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";

const statusConfig = {
  pendente: { label: "Pendente", icon: Clock, color: "bg-yellow-500/20 text-yellow-400" },
  processando: { label: "Processando", icon: Package, color: "bg-blue-500/20 text-blue-400" },
  enviado: { label: "Enviado", icon: Truck, color: "bg-purple-500/20 text-purple-400" },
  entregue: { label: "Entregue", icon: CheckCircle, color: "bg-green-500/20 text-green-400" },
  cancelado: { label: "Cancelado", icon: XCircle, color: "bg-red-500/20 text-red-400" },
};

export default function AdminPedidos() {
  const { pedidos, loading } = useAdminStorage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredPedidos = pedidos.filter((p) => {
    const matchesSearch =
      p.cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPedido = pedidos.find((p) => p.id === selectedOrder);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Pedidos</h1>
            <p className="text-gray-400">{pedidos.length} pedidos</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card-dark p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por cliente ou ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
            >
              <option value="">Todos os status</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="glass-card-dark overflow-hidden">
          {filteredPedidos.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Pedido</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Cliente</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Total</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Data</th>
                    <th className="text-right text-xs font-medium text-gray-400 px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPedidos.map((pedido) => {
                    const StatusIcon = statusConfig[pedido.status]?.icon || Clock;
                    return (
                      <tr key={pedido.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3">
                          <span className="font-medium text-white">#{pedido.id.slice(0, 8)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white">{pedido.cliente.nome}</p>
                            <p className="text-xs text-gray-500">{pedido.cliente.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-white font-medium">
                            R$ {pedido.total.toFixed(2).replace(".", ",")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                              statusConfig[pedido.status]?.color || "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[pedido.status]?.label || pedido.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedOrder(pedido.id)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="glass-card-dark p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Pedido #{selectedPedido.id.slice(0, 8)}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-gray-400 hover:text-white">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-medium ${
                    statusConfig[selectedPedido.status]?.color || "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {statusConfig[selectedPedido.status]?.label || selectedPedido.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Cliente</p>
                <p className="text-white">{selectedPedido.cliente.nome}</p>
                <p className="text-sm text-gray-400">{selectedPedido.cliente.email}</p>
                <p className="text-sm text-gray-400">{selectedPedido.cliente.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Produtos</p>
                <div className="mt-2 space-y-2">
                  {selectedPedido.produtos.map((produto, i) => (
                    <div key={i} className="flex justify-between p-2 bg-gray-800/30 rounded-lg">
                      <div>
                        <p className="text-white">{produto.nome}</p>
                        <p className="text-xs text-gray-400">Qtd: {produto.quantidade}</p>
                      </div>
                      <p className="text-white font-medium">
                        R$ {(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-400">Total</p>
                  <p className="text-xl font-bold text-white">
                    R$ {selectedPedido.total.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}