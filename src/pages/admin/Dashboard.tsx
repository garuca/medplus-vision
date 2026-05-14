import { Link } from "wouter";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { formatarPreco } from "../../lib/format";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";

const statCards = [
  {
    label: "Total Produtos",
    key: "produtos",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    change: "+12%",
  },
  {
    label: "Pedidos",
    key: "pedidos",
    icon: ShoppingCart,
    color: "from-purple-500 to-pink-500",
    change: "+8%",
  },
  {
    label: "Receita",
    key: "receita",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    change: "+23%",
  },
  {
    label: "Visualizações",
    key: "views",
    icon: Eye,
    color: "from-orange-500 to-amber-500",
    change: "-2%",
  },
];

export default function AdminDashboard() {
  const { produtos, pedidos, loading } = useAdminStorage();

  const stats = [
    {
      value: produtos.length,
      label: "Total Produtos",
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
      isPositive: true,
    },
    {
      value: pedidos.length,
      label: "Pedidos este mês",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-500",
      change: "+8%",
      isPositive: true,
    },
    {
      value: 12,
      label: "Pedidos pendentes",
      icon: AlertTriangle,
      color: "from-orange-500 to-amber-500",
      change: "3 novos",
      isPositive: false,
    },
    {
      value: 47,
      label: "Acessos hoje",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      change: "+15%",
      isPositive: true,
    },
  ];

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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Visão geral do seu e-commerce</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card-dark p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${stat.isPositive ? "text-green-400" : "text-orange-400"}`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/produtos/novo"
              className="glass-card-dark p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Novo Produto</p>
                <p className="text-xs text-gray-400">Adicionar item</p>
              </div>
            </Link>
            <Link
              href="/admin/categorias"
              className="glass-card-dark p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Categorias</p>
                <p className="text-xs text-gray-400">Gerenciar</p>
              </div>
            </Link>
            <Link
              href="/admin/pedidos"
              className="glass-card-dark p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Pedidos</p>
                <p className="text-xs text-gray-400">Ver todos</p>
              </div>
            </Link>
            <Link
              href="/admin/config"
              className="glass-card-dark p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">Configurações</p>
                <p className="text-xs text-gray-400">Ajustes gerais</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Produtos Recentes</h2>
            <Link href="/admin/produtos" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="glass-card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                      Produto
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                      Categoria
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Preço</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                      Estoque
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.slice(0, 5).map((produto) => (
                    <tr
                      key={produto.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={produto.imagemPrincipal}
                            alt={produto.nome}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-white truncate max-w-[200px]">
                            {produto.nome}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{produto.categoria}</td>
                      <td className="px-6 py-4 text-white font-medium">
                        R$ {formatarPreco(produto.preco)}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{produto.estoque}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${produto.ativo === false ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
                        >
                          {produto.ativo === false ? "Inativo" : "Ativo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {produtos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Nenhum produto cadastrado.{" "}
                        <Link href="/admin/produtos/novo" className="text-primary hover:underline">
                          Adicionar primeiro produto
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
