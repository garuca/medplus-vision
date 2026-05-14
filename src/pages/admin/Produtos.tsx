import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  Filter,
  ChevronDown,
  X,
  Image,
} from "lucide-react";
import { formatarPreco } from "../../lib/format";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";
import type { Produto } from "../../types/admin";

export default function AdminProdutos() {
  const { produtos, categorias, deleteProduto, loading } = useAdminStorage();
  const [search, setSearch] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Produto | null>(null);

  const filteredProdutos = produtos.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategoria = !categoriaFilter || p.categoria === categoriaFilter;
    const matchesStatus =
      !statusFilter || (statusFilter === "ativos" ? p.ativo !== false : p.ativo === false);
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const handleDelete = () => {
    if (deleteModal) {
      deleteProduto(deleteModal.id);
      setDeleteModal(null);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(produtos, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medplus-produtos-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data)) {
            localStorage.setItem("medplus_produtos", JSON.stringify(data));
            window.location.reload();
          }
        } catch {
          alert("Erro ao importar arquivo JSON");
        }
      };
      reader.readAsText(file);
    }
  };

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
            <h1 className="text-2xl font-bold text-white">Produtos</h1>
            <p className="text-gray-400">{produtos.length} produtos cadastrados</p>
          </div>
          <div className="flex gap-2">
            <label className="btn-secondary cursor-pointer px-4 py-2 rounded-lg font-medium text-sm">
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              Importar
            </label>
            <button
              onClick={handleExport}
              className="btn-secondary px-4 py-2 rounded-lg font-medium text-sm"
            >
              Exportar
            </button>
            <Link
              href="/admin/produtos/novo"
              className="btn-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Novo Produto
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="glass-card-dark p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nome ou SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 ${showFilters ? "border-primary text-primary" : ""}`}
            >
              <Filter className="h-4 w-4" /> Filtros
              {(categoriaFilter || statusFilter) && (
                <span className="h-2 w-2 rounded-full bg-primary"></span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-800">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Categoria</label>
                <select
                  value={categoriaFilter}
                  onChange={(e) => setCategoriaFilter(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Todas</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Todos</option>
                  <option value="ativos">Ativos</option>
                  <option value="inativos">Inativos</option>
                </select>
              </div>
              {(categoriaFilter || statusFilter) && (
                <button
                  onClick={() => {
                    setCategoriaFilter("");
                    setStatusFilter("");
                  }}
                  className="self-end text-sm text-red-400 hover:text-red-300"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="glass-card-dark overflow-hidden">
          {filteredProdutos.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Nenhum produto encontrado</p>
              <Link href="/admin/produtos/novo" className="text-primary hover:underline">
                Adicionar primeiro produto
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">
                      Produto
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3 hidden md:table-cell">
                      Categoria
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Preço</th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3 hidden md:table-cell">
                      Estoque
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">
                      Status
                    </th>
                    <th className="text-right text-xs font-medium text-gray-400 px-4 py-3">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProdutos.map((produto) => (
                    <tr
                      key={produto.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {produto.imagemPrincipal ? (
                            <img
                              src={produto.imagemPrincipal}
                              alt={produto.nome}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                              <Image className="h-6 w-6 text-gray-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white truncate max-w-[200px]">
                              {produto.nome}
                            </p>
                            <p className="text-xs text-gray-500">SKU: {produto.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-gray-300">{produto.categoria}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white font-medium">
                          R$ {formatarPreco(produto.preco)}
                        </span>
                        {produto.precoOriginal && produto.precoOriginal > produto.preco && (
                          <span className="ml-2 text-xs text-gray-500 line-through">
                            R$ {formatarPreco(produto.precoOriginal)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={produto.estoque > 0 ? "text-gray-300" : "text-red-400"}>
                          {produto.estoque}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            produto.ativo === false
                              ? "bg-red-500/20 text-red-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {produto.ativo === false ? "Inativo" : "Ativo"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/produto/${produto.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/produtos/${produto.id}`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteModal(produto)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="glass-card-dark p-6 rounded-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-2">Excluir Produto?</h3>
            <p className="text-gray-400 mb-6">
              Tem certeza que deseja excluir <span className="text-white">{deleteModal.nome}</span>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 btn-secondary py-2.5 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
