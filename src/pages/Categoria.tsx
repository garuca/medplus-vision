import { Link, useRoute } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  AlertTriangle,
  HeartPulse,
  Microscope,
  Zap,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  Baby,
  Dog,
  Activity,
  Droplets,
  Bone,
  Package,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useProdutos } from "../hooks/useProdutos";
import { useCategorias } from "../hooks/useCategorias";
import { useCart } from "../context/CartContext";

const categoryIcons: Record<string, LucideIcon> = {
  "urgencia-emergencia": AlertTriangle,
  "sinais-vitais": HeartPulse,
  diagnostico: Microscope,
  "instrumentais-cirurgicos": Zap,
  especialidades: HeartHandshake,
  "area-do-academico": GraduationCap,
  hospiluvas: Briefcase,
  "hospi-kids": Baby,
  hospivet: Dog,
  cardiorespiratorio: Activity,
  "limpeza-hospitalar": Droplets,
  "ortopedia-reabilitacao": Bone,
};

const bannerGradients = [
  "from-red-500 to-red-700",
  "from-rose-500 to-rose-700",
  "from-purple-500 to-purple-700",
  "from-violet-500 to-violet-700",
  "from-indigo-500 to-indigo-700",
  "from-blue-500 to-blue-700",
  "from-cyan-500 to-cyan-700",
  "from-pink-500 to-pink-700",
  "from-amber-500 to-amber-700",
  "from-orange-500 to-orange-700",
  "from-teal-500 to-teal-700",
  "from-emerald-500 to-emerald-700",
];

export default function Categoria() {
  const [, params] = useRoute("/loja/categoria/:slug");
  const [ordem, setOrdem] = useState("relevancia");
  const { adicionarProduto } = useCart();
  const { produtos: todosProdutos } = useProdutos();
  const { categorias } = useCategorias();

  const slug = params?.slug || "urgencia-emergencia";
  const cat = categorias.find((c) => c.slug === slug);

  const produtos = useMemo(() => {
    const filtrados = todosProdutos.filter(
      (p) => p.categoria?.toLowerCase().trim() === slug.toLowerCase().trim(),
    );
    switch (ordem) {
      case "menor":
        return [...filtrados].sort((a, b) => a.preco - b.preco);
      case "maior":
        return [...filtrados].sort((a, b) => b.preco - a.preco);
      case "nome":
        return [...filtrados].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
      default:
        return filtrados;
    }
  }, [todosProdutos, slug, ordem]);

  const gradientIndex = [...bannerGradients.keys()].reduce(
    (acc, _, i, arr) => (slug.charCodeAt(i % slug.length) + acc) % arr.length,
    0,
  );
  const gradiente = bannerGradients[gradientIndex];
  const Icon = categoryIcons[slug] || Package;

  return (
    <>
      <section className="px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/loja"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>

          {/* Banner */}
          <div
            className={`mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradiente} px-8 text-white`}
          >
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5 animate-pulse"></div>
            <div className="relative flex h-40 items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon className="h-16 w-16 animate-bounce" />
                <div>
                  <h2 className="text-2xl font-bold">{cat?.nome || slug}</h2>
                  <p className="text-sm text-white/80">Produtos de {cat?.nome || slug}</p>
                </div>
              </div>
              <span className="hidden md:block text-5xl font-bold text-white/20">
                {produtos.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{produtos.length} produtos</span>
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
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.map((product: any) => (
              <div key={product.id} className="glass-card group flex flex-col p-3">
                <Link to={`/produto/${product.id}`}>
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
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary">
                      {product.nome}
                    </h3>
                  </Link>
                  <div className="mt-2">
                    {product.precoPromocional ? (
                      <>
                        <span className="text-xs text-muted-foreground line-through">
                          R$ {product.preco.toFixed(2).replace(".", ",")}
                        </span>
                        <div className="text-lg font-bold text-primary">
                          R$ {product.precoPromocional.toFixed(2).replace(".", ",")}
                        </div>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        R$ {product.preco.toFixed(2).replace(".", ",")}
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
        </div>
      </section>
    </>
  );
}
