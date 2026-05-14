import { Link, useLocation } from "wouter";
import { Search, Filter, X, ArrowLeft, ArrowRight, Package, TrendingUp, Award } from "lucide-react";
import { useState, useMemo } from "react";
import { useProdutos } from "../hooks/useProdutos";
import { useCategorias } from "../hooks/useCategorias";
import { SectionTitle } from "../components/SectionTitle";
import { formatarPreco } from "../lib/format";
import { useCart } from "../context/CartContext";

export default function Loja() {
  const [location] = useLocation();
  const [busca, setBusca] = useState(
    () => new URLSearchParams(window.location.search).get("busca") || "",
  );
  const [ordem, setOrdem] = useState("relevancia");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<Set<string>>(new Set());
  const [marcasSelecionadas, setMarcasSelecionadas] = useState<Set<string>>(new Set());
  const { adicionarProduto } = useCart();
  const [pagina, setPagina] = useState(1);
  const produtosPorPagina = 12;

  const { produtos: allProducts, loading } = useProdutos();
  const { categorias } = useCategorias();

  const getProdutoLink = (id: string) => `/produto/${id}`;

  const filtroAtivo = new URLSearchParams(window.location.search).get("filtro");

  const marcas = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      if (p.marca) set.add(p.marca);
    });
    return Array.from(set).sort();
  }, [allProducts]);

  const toggleCategoria = (slug: string) => {
    setCategoriasSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
    setPagina(1);
  };

  const toggleMarca = (marca: string) => {
    setMarcasSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(marca)) next.delete(marca);
      else next.add(marca);
      return next;
    });
    setPagina(1);
  };

  const limparFiltros = () => {
    setCategoriasSelecionadas(new Set());
    setMarcasSelecionadas(new Set());
    setBusca("");
    setPagina(1);
  };

  const produtosFiltrados = allProducts
    .filter((p) => {
      if (filtroAtivo === "novidades") return p.flag_novidade;
      if (filtroAtivo === "mais-vendidos") return p.flag_mais_vendido;
      return true;
    })
    .filter((p) => {
      if (categoriasSelecionadas.size === 0) return true;
      return categoriasSelecionadas.has(p.categoria);
    })
    .filter((p) => {
      if (marcasSelecionadas.size === 0) return true;
      return p.marca && marcasSelecionadas.has(p.marca);
    })
    .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (ordem === "menor") return a.preco - b.preco;
      if (ordem === "maior") return b.preco - a.preco;
      if (ordem === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      return 0;
    });

  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
  const produtosPaginados = produtosFiltrados.slice(
    (pagina - 1) * produtosPorPagina,
    pagina * produtosPorPagina,
  );

  return (
    <>
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Banner Loja */}
          <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 px-8 text-white">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 animate-pulse"></div>
            <div className="absolute top-4 right-8 flex gap-6">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="text-xs">+{allProducts.length} produtos</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Qualidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-xs">Desde 2009</span>
              </div>
            </div>
            <div className="relative flex h-40 items-center">
              <div>
                <h2 className="text-3xl font-bold">Nossos Produtos</h2>
                <p className="text-cyan-100">
                  Excelência em suprimentos médicos para profissionais e instituições de Saúde
                </p>
              </div>
            </div>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="glass-input w-full rounded-xl pl-10 pr-4 py-3"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {produtosFiltrados.length} produtos
              </span>
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="btn-glass rounded-xl px-4 py-2 text-sm flex items-center gap-2"
              >
                <Filter className="h-4 w-4" /> Filtrar
              </button>
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                className="glass-input rounded-xl px-4 py-2 text-sm"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor">Menor Preço</option>
                <option value="maior">Maior Preço</option>
                <option value="nome">Nome A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Sidebar Filtros */}
            {mostrarFiltros && (
              <div className="glass-card p-4 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filtros</h3>
                  {(categoriasSelecionadas.size > 0 || marcasSelecionadas.size > 0 || busca) && (
                    <button
                      onClick={limparFiltros}
                      className="text-xs text-primary hover:underline"
                    >
                      Limpar
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categoria</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categorias.map((cat) => (
                        <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={categoriasSelecionadas.has(cat.slug)}
                            onChange={() => toggleCategoria(cat.slug)}
                            className="rounded border-border"
                          />
                          <span className="text-sm">{cat.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {marcas.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Marca</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {marcas.map((marca) => (
                          <label key={marca} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={marcasSelecionadas.has(marca)}
                              onChange={() => toggleMarca(marca)}
                              className="rounded border-border"
                            />
                            <span className="text-sm">{marca}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Grid Produtos */}
            <div className={`${mostrarFiltros ? "lg:col-span-3" : "lg:col-span-4"}`}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {produtosPaginados.map((product) => (
                  <div key={product.id} className="glass-card group flex flex-col p-3">
                    <Link to={getProdutoLink(product.id)}>
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-white/50">
                        <img
                          src={product.imagem}
                          alt={product.nome}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        {product.precoPromocional && product.precoPromocional < product.preco && (
                          <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                            {Math.round(
                              ((product.preco - product.precoPromocional) / product.preco) * 100,
                            )}
                            %
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="mt-3 flex-1">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {product.marca}
                      </span>
                      <Link to={getProdutoLink(product.id)}>
                        <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary">
                          {product.nome}
                        </h3>
                      </Link>
                      <div className="mt-2">
                        {product.precoPromocional ? (
                          <>
                            <span className="text-xs text-muted-foreground line-through">
                              R$ {formatarPreco(product.preco)}
                            </span>
                            <div className="text-lg font-bold text-primary">
                              R$ {formatarPreco(product.precoPromocional)}
                            </div>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary">
                            R$ {formatarPreco(product.preco)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => adicionarProduto(product)}
                      className="mt-3 w-full rounded-xl bg-primary/15 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>

              {/* Paginação */}
              {totalPaginas > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setPagina(Math.max(1, pagina - 1))}
                    disabled={pagina === 1}
                    className="btn-glass rounded-xl px-4 py-2 text-sm disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPagina(p)}
                      className={`btn-glass rounded-xl px-4 py-2 text-sm ${pagina === p ? "bg-primary text-white" : ""}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
                    disabled={pagina === totalPaginas}
                    className="btn-glass rounded-xl px-4 py-2 text-sm disabled:opacity-50"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
