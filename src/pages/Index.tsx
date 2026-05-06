import { Link } from "wouter";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  Clock,
  ChevronRight,
  Activity,
  Baby,
  Dog,
  Bone,
  HeartPulse,
  GraduationCap,
  Microscope,
  AlertTriangle,
  Droplets,
  Zap,
  BadgeCheck,
  HeartHandshake,
  Briefcase,
  MapPin,
  CreditCard,
  MessageCircle,
  Wallet,
  Lock,
} from "lucide-react";
import { products } from "../data/produtos";
import { useProdutos } from "../hooks/useProdutos";
import { placeholderImages } from "../lib/images";
import { SectionTitle } from "../components/SectionTitle";
import { useCart } from "../context/CartContext";

const categoriesMenu = [
  {
    slug: "urgencia-emergencia",
    nome: "Urgência e Emergência",
    icone: AlertTriangle,
    cor: "bg-red-100 text-red-600",
  },
  {
    slug: "sinais-vitais",
    nome: "Sinais Vitais",
    icone: HeartPulse,
    cor: "bg-rose-100 text-rose-600",
  },
  {
    slug: "diagnostico",
    nome: "Diagnóstico",
    icone: Microscope,
    cor: "bg-purple-100 text-purple-600",
  },
  {
    slug: "instrumentais-cirurgicos",
    nome: "Instrumentais Cirúrgicos",
    icone: Zap,
    cor: "bg-violet-100 text-violet-600",
  },
  {
    slug: "especialidades",
    nome: "Especialidades",
    icone: HeartHandshake,
    cor: "bg-indigo-100 text-indigo-600",
  },
  {
    slug: "area-do-academico",
    nome: "Área do Acadêmico",
    icone: GraduationCap,
    cor: "bg-blue-100 text-blue-600",
  },
  { slug: "hospiluvas", nome: "HOSPILUVAS", icone: Briefcase, cor: "bg-cyan-100 text-cyan-600" },
  { slug: "hospi-kids", nome: "HOSPI KIDS", icone: Baby, cor: "bg-pink-100 text-pink-600" },
  { slug: "hospivet", nome: "HOSPIVET", icone: Dog, cor: "bg-amber-100 text-amber-600" },
  {
    slug: "cardiorespiratorio",
    nome: "Cardiorespiratório",
    icone: Activity,
    cor: "bg-orange-100 text-orange-600",
  },
  {
    slug: "limpeza-hospitalar",
    nome: "Limpeza Hospitalar",
    icone: Droplets,
    cor: "bg-teal-100 text-teal-600",
  },
  {
    slug: "ortopedia-reabilitacao",
    nome: "Ortopedia e Reabilitação",
    icone: Bone,
    cor: "bg-emerald-100 text-emerald-600",
  },
];

const clientLogos = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  nome: `Cliente ${i + 1}`,
  imagem: `/logos-clientes-medplus${i === 0 ? "" : i}.png`,
}));

const banners = {
  hero: {
    titulo: "Excelência em suprimentos médicos para profissionais e instituições",
    subtitulo: "Parceria confiável com qualidade comprovada",
    descricao: "Desde 2012 fornecendo equipamentos médicos de qualidade",
    botao: "CONHECER CATÁLOGO",
    link: "/loja",
  },
  intermediario: {
    titulo: "Ofertas Especiais",
    subtitulo: "Até 30% de desconto em equipamentos médicos",
    botao: "Ver Ofertas",
  },
  grid: [
    { titulo: "Novidades", descricao: "Check out os novos chegada", botao: "Saiba Mais" },
    { titulo: "Mais Vendidos", descricao: "Os preferidos dos clientes", botao: "Ver Todos" },
  ],
  footer: {
    titulo: "Precisa de ajuda?",
    descricao: "Atendimento rápido pelo WhatsApp",
    botao: "Falar no WhatsApp",
  },
};

export default function Index() {
  const { adicionarProduto } = useCart();

  return (
    <>
      {/* Banner Hero - Texto esquerda, Imagem direita */}
      <section className="relative px-4 pt-6 pb-8 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>

        <div className="mx-auto max-w-7xl relative">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {banners.hero.titulo}
              </h1>
              <p className="mt-4 text-xl text-gray-600">{banners.hero.subtitulo}</p>
              <p className="mt-2 text-gray-500">{banners.hero.descricao}</p>
              <div className="mt-8">
                <Link
                  to={banners.hero.link}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold overflow-hidden shadow-lg shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center gap-3">
                    VER TODOS OS PRODUTOS
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/30 via-blue-400/20 to-cyan-400/30 rounded-[3rem] blur-3xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-white/50 to-transparent rounded-[2.5rem]"></div>
              <div className="relative glass-card p-3 rounded-3xl shadow-2xl shadow-cyan-500/10">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={placeholderImages.banner}
                    alt="MedPlus - Equipamentos Médicos"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute top-1/2 -left-8 w-6 h-6 bg-cyan-400/60 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/3 -right-4 w-4 h-4 bg-blue-400/60 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Ticker - Clientes */}
      <section className="px-4 py-6 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative">
            <div className="flex animate-scroll gap-8">
              {[...clientLogos, ...clientLogos].map((cliente, idx) => (
                <div key={idx} className="flex-shrink-0 h-12 w-32 flex items-center justify-center">
                  <img
                    src={cliente.imagem}
                    alt={cliente.nome}
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Benefícios com Ícones Animados */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                <CreditCard className="h-6 w-6 animate-pulse" />
              </div>
              <span className="text-xs font-medium text-foreground">Descontos</span>
              <span className="text-xs font-bold text-foreground">à Vista</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white mb-2">
                <MessageCircle className="h-6 w-6 animate-pulse" />
              </div>
              <span className="text-xs font-medium text-foreground">WhatsApp</span>
              <span className="text-xs font-bold text-foreground">(62) 9489-6602</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-2">
                <Wallet className="h-6 w-6 animate-pulse" />
              </div>
              <span className="text-xs font-medium text-foreground">Até 3x</span>
              <span className="text-xs font-bold text-foreground">sem juros</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-2">
                <Lock className="h-6 w-6 animate-pulse" />
              </div>
              <span className="text-xs font-medium text-foreground">Segurança</span>
              <span className="text-xs font-bold text-foreground">na sua Compra</span>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Intermediário - Oferta Especial */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 px-10 py-14 text-white shadow-2xl shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl animate-pulse"></div>
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
                Oferta Limitada
              </span>
            </div>
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold leading-tight">{banners.intermediario.titulo}</h2>
                <p className="mt-3 text-lg text-blue-100">{banners.intermediario.subtitulo}</p>
              </div>
              <div className="text-center lg:text-right">
                <Link
                  to="/loja"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-600 hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20"
                >
                  {banners.intermediario.botao}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Destaques" title="Produtos em Destaque" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
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
                        <div>
                          <span className="text-lg font-bold text-primary">
                            R$ {product.precoPromocional.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="ml-1 text-xs text-green-600">à vista</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ou {Math.ceil(product.precoPromocional / 2)}x de R${" "}
                          {(product.precoPromocional / 2).toFixed(2).replace(".", ",")}
                        </span>
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

      {/* Banner Grid - Novidades e Mais Vendidos */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/loja"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 px-10 py-12 text-white hover:shadow-2xl hover:shadow-purple-500/25 transition-all hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform"></div>
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-violet-400/20 blur-3xl"></div>
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
                  NOVO
                </span>
                <h3 className="text-3xl font-bold">{banners.grid[0].titulo}</h3>
                <p className="mt-2 text-purple-100 text-lg">{banners.grid[0].descricao}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition">
                  {banners.grid[0].botao} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link
              to="/loja"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 px-10 py-12 text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform"></div>
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-orange-400/20 blur-3xl"></div>
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
                  TOP
                </span>
                <h3 className="text-3xl font-bold">{banners.grid[1].titulo}</h3>
                <p className="mt-2 text-orange-100 text-lg">{banners.grid[1].descricao}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition">
                  {banners.grid[1].botao} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Mais Ofertas */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Ofertas" title="Melhores Ofertas" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="glass-card group flex flex-col p-3">
                <Link to={`/produto/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white/50">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="mt-3">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary">
                      {product.nome}
                    </h3>
                  </Link>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-primary">
                      R$ {product.preco.toFixed(2).replace(".", ",")}
                    </span>
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

      {/* Banner Footer - Suporte */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-10 text-white">
            <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="text-2xl font-bold">{banners.footer.titulo}</h2>
                <p className="mt-2 text-gray-400">{banners.footer.descricao}</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <a
                  href="https://api.whatsapp.com/send/?phone=556294896602"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-sm font-semibold text-white hover:bg-cyan-600 transition"
                >
                  <Headphones className="h-4 w-4" />
                  {banners.footer.botao}
                </a>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-500/5"></div>
          </div>
        </div>
      </section>

      {/* Política de Serviços */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100">
                <Shield className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Compra Segura</h3>
                <p className="text-sm text-gray-500">Política de devolução 7 dias</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                <Headphones className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Suporte</h3>
                <p className="text-sm text-gray-500">Atendimento humanizado</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Entrega Rápida</h3>
                <p className="text-sm text-gray-500">Para todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Categorias" title="Navegue por Categoria" />
          <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {categoriesMenu.map((cat) => {
              const Icon = cat.icone;
              return (
                <Link
                  key={cat.slug}
                  to={`/loja/categoria/${cat.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="glass-card flex flex-col items-center justify-center p-5 text-center hover:bg-white/80 transition-all group-hover:scale-105">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.cor} mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground group-hover:font-semibold transition">
                      {cat.nome}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA - Precisa de ajuda? */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 px-10 py-16 text-white text-center shadow-2xl shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold">Precisa de ajuda?</h2>
              <p className="mt-4 text-xl text-blue-100">Atendimento rápido pelo WhatsApp</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=5562994896602"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-600 hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp: (62) 99489-6602
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
