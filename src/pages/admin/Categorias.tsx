import { useState } from "react";
import { FolderCog, Plus, Edit2, Trash2, X, GripVertical, Package } from "lucide-react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";
import type { Categoria } from "../../types/admin";

export default function AdminCategorias() {
  const { categorias, addCategoria, updateCategoria, deleteCategoria, loading } = useAdminStorage();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [form, setForm] = useState({ nome: "", slug: "", icone: "" });
  const [deleteModal, setDeleteModal] = useState<Categoria | null>(null);

  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingCategoria(categoria);
      setForm({ nome: categoria.nome, slug: categoria.slug, icone: categoria.icone || "" });
    } else {
      setEditingCategoria(null);
      setForm({ nome: "", slug: "", icone: "" });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.nome || !form.slug) return;

    if (editingCategoria) {
      updateCategoria(editingCategoria.id, form);
    } else {
      addCategoria(form);
    }
    setModalOpen(false);
    setForm({ nome: "", slug: "", icone: "" });
  };

  const handleDelete = () => {
    if (deleteModal) {
      deleteCategoria(deleteModal.id);
      setDeleteModal(null);
    }
  };

  const generateSlug = (nome: string) => {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Categorias</h1>
            <p className="text-gray-400">{categorias.length} categorias cadastradas</p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nova Categoria
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="glass-card-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500">
                  <FolderCog className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">{categoria.nome}</p>
                  <p className="text-xs text-gray-500">/{categoria.slug}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenModal(categoria)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteModal(categoria)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {categorias.length === 0 && (
          <div className="glass-card-dark p-12 text-center">
            <FolderCog className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Nenhuma categoria cadastrada</p>
            <button onClick={() => handleOpenModal()} className="text-primary hover:underline">
              Adicionar primeira categoria
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="glass-card-dark p-6 rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{editingCategoria ? "Editar Categoria" : "Nova Categoria"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value, slug: generateSlug(e.target.value) })}
                  placeholder="Ex: Descartáveis"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: generateSlug(e.target.value) })}
                  placeholder="descartaveis"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /categoria/{form.slug}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModalOpen(false)} className="flex-1 btn-secondary py-2.5 rounded-xl">
                  Cancelar
                </button>
                <button onClick={handleSave} className="flex-1 btn-primary py-2.5 rounded-xl">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="glass-card-dark p-6 rounded-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-2">Excluir Categoria?</h3>
            <p className="text-gray-400 mb-6">
              Tem certeza que deseja excluir <span className="text-white">{deleteModal.nome}</span>? Os produtos desta categoria ficarão sem categoria.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 btn-secondary py-2.5 rounded-xl">
                Cancelar
              </button>
              <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}