import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Package,
} from "lucide-react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";
import { uploadImage, isBase64 } from "../../lib/imageUpload";

export default function NovoProduto() {
  const [, setLocation] = useLocation();
  const { categorias, addProduto, updateProduto, produtos, loading } = useAdminStorage();

  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    precoOriginal: "",
    imagemPrincipal: "",
    imagemSecundaria1: "",
    imagemSecundaria2: "",
    imagemSecundaria3: "",
    imagemSecundaria4: "",
    categoria: "",
    estoque: "",
    sku: "",
    altura: "",
    largura: "",
    comprimento: "",
    peso: "",
    destaque: false,
    ativo: true,
    especificacoes: "",
  });
  const [saving, setSaving] = useState(false);
  const [previewModal, setPreviewModal] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    if (id && id !== "novo") {
      const produto = produtos.find((p) => p.id === id);
      if (produto) {
        setProdutoId(produto.id);
        setForm({
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco.toString(),
          precoOriginal: produto.precoOriginal?.toString() || "",
          imagemPrincipal: produto.imagemPrincipal,
          imagemSecundaria1: produto.imagensSecundarias[0] || "",
          imagemSecundaria2: produto.imagensSecundarias[1] || "",
          imagemSecundaria3: produto.imagensSecundarias[2] || "",
          imagemSecundaria4: produto.imagensSecundarias[3] || "",
          categoria: produto.categoria,
          estoque: produto.estoque.toString(),
          sku: produto.sku,
          altura: produto.dimensoes.altura.toString(),
          largura: produto.dimensoes.largura.toString(),
          comprimento: produto.dimensoes.comprimento.toString(),
          peso: produto.peso.toString(),
          destaque: produto.destaque || false,
          ativo: produto.ativo !== false,
          especificacoes: produto.especificacoes || "",
        });
      }
    }
  }, [produtos]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);

    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const imagensSecundarias = [
      form.imagemSecundaria1,
      form.imagemSecundaria2,
      form.imagemSecundaria3,
      form.imagemSecundaria4,
    ].filter((url) => url && !isBase64(url));

    const produtoData = {
      nome: form.nome,
      descricao: form.descricao,
      preco: parseFloat(form.preco),
      precoOriginal: form.precoOriginal ? parseFloat(form.precoOriginal) : undefined,
      imagemPrincipal:
        form.imagemPrincipal && !isBase64(form.imagemPrincipal) ? form.imagemPrincipal : "",
      imagensSecundarias,
      categoria: form.categoria,
      estoque: parseInt(form.estoque) || 0,
      sku: form.sku,
      dimensoes: {
        altura: parseFloat(form.altura) || 0,
        largura: parseFloat(form.largura) || 0,
        comprimento: parseFloat(form.comprimento) || 0,
      },
      peso: parseFloat(form.peso) || 0,
      destaque: form.destaque,
      ativo: form.ativo,
      especificacoes: form.especificacoes,
    };

    try {
      if (produtoId) {
        await updateProduto(produtoId, produtoData);
      } else {
        await addProduto(produtoData);
      }
      setSaving(false);
      setLocation("/admin/produtos");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setSaving(false);
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

  const imageFields = [
    { key: "imagemPrincipal", label: "Imagem Principal", required: true },
    { key: "imagemSecundaria1", label: "Imagem 2" },
    { key: "imagemSecundaria2", label: "Imagem 3" },
    { key: "imagemSecundaria3", label: "Imagem 4" },
    { key: "imagemSecundaria4", label: "Imagem 5" },
  ];

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/produtos" className="p-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {produtoId ? "Editar Produto" : "Novo Produto"}
              </h1>
              <p className="text-gray-400">
                {produtoId ? "Atualize as informações" : "Preencha os dados do produto"}
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card-dark p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Informações Gerais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Ex: Luva Cirúrgica"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Descrição *
                  </label>
                  <textarea
                    value={form.descricao}
                    onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    placeholder="Descrição detalhada do produto..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Especificações Técnicas
                  </label>
                  <textarea
                    value={form.especificacoes}
                    onChange={(e) => setForm({ ...form, especificacoes: e.target.value })}
                    placeholder="Ex: Material: PVC&#10;Tamaño: 10cm&#10;Cor: Branco"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use Enter para separar cada especificação em uma nova linha
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Preço *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={form.preco}
                        onChange={(e) => setForm({ ...form, preco: e.target.value })}
                        placeholder="0,00"
                        required
                        className="w-full pl-8 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Preço Original (desconto)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={form.precoOriginal}
                        onChange={(e) => setForm({ ...form, precoOriginal: e.target.value })}
                        placeholder="0,00"
                        className="w-full pl-8 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card-dark p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Imagens do Produto</h2>
              <p className="text-sm text-gray-400 mb-4">
                Envie imagens em formato JPG ou PNG (máx 5MB cada)
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {imageFields.map((img) => (
                  <div key={img.key}>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      {img.label} {img.required && <span className="text-red-400">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, img.key)}
                        className="hidden"
                        id={`${img.key}-file`}
                      />
                      <label
                        htmlFor={`${img.key}-file`}
                        className="flex items-center justify-center h-24 bg-gray-900/50 border border-gray-700 rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        {form[img.key as keyof typeof form] ? (
                          <div className="relative h-full w-full">
                            <img
                              src={form[img.key as keyof typeof form] as string}
                              alt=""
                              className="h-full w-full object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setForm({ ...form, [img.key]: "" });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                            >
                              <X className="h-3 w-3 text-white" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500">
                            <Upload className="h-6 w-6 mx-auto mb-1" />
                            <span className="text-xs">Clique para enviar</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-dark p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Informações para Frete</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Peso (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.peso}
                    onChange={(e) => setForm({ ...form, peso: e.target.value })}
                    placeholder="0.00"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    SKU/Código *
                  </label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    placeholder="Ex: LUVA-CIR-001"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-300 mb-2">Dimensões (cm)</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      value={form.altura}
                      onChange={(e) => setForm({ ...form, altura: e.target.value })}
                      placeholder="Altura"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Altura</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      value={form.largura}
                      onChange={(e) => setForm({ ...form, largura: e.target.value })}
                      placeholder="Largura"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Largura</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      value={form.comprimento}
                      onChange={(e) => setForm({ ...form, comprimento: e.target.value })}
                      placeholder="Comprimento"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Comprimento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card-dark p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Categoria *
                  </label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Selecione...</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.nome}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    value={form.estoque}
                    onChange={(e) => setForm({ ...form, estoque: e.target.value })}
                    placeholder="0"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Produto ativo</p>
                    <p className="text-xs text-gray-400">Visível na loja</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, ativo: !form.ativo })}
                    className={`w-12 h-6 rounded-full transition-colors ${form.ativo ? "bg-green-500" : "bg-gray-700"}`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${form.ativo ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Destaque</p>
                    <p className="text-xs text-gray-400">Destaque na home</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, destaque: !form.destaque })}
                    className={`w-12 h-6 rounded-full transition-colors ${form.destaque ? "bg-primary" : "bg-gray-700"}`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${form.destaque ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card-dark p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Ajuda</h2>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p>Campos com * são obrigatórios</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <p>Imagens com aspecto 1:1 funcionam melhor</p>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <p>Dimensões usadas para calcular frete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
