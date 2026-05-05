import { Link } from "wouter";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Phone,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { placeholderImages } from "../lib/images";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Loja" },
  { to: "/sobre", label: "Sobre" },
  { to: "/registro-de-preco", label: "Registro de Preço" },
  { to: "/servicos", label: "Serviços" },
  { to: "/contato", label: "Contato" },
] as const;

const categorias = [
  { slug: "urgencia-emergencia", nome: "Urgência e Emergência" },
  { slug: "sinais-vitais", nome: "Sinais Vitais" },
  { slug: "diagnostico", nome: "Diagnóstico" },
  { slug: "instrumentais-cirurgicos", nome: "Instrumentais Cirúrgicos" },
  { slug: "especialidades", nome: "Especialidades" },
  { slug: "area-do-academico", nome: "Área do Acadêmico" },
  { slug: "hospiluvas", nome: "HOSPILUVAS" },
  { slug: "hospi-kids", nome: "HOSPI KIDS" },
  { slug: "hospivet", nome: "HOSPIVET" },
  { slug: "cardiorespiratorio", nome: "Cardiorespiratório" },
  { slug: "limpeza-hospitalar", nome: "Limpeza Hospitalar" },
  { slug: "ortopedia-reabilitacao", nome: "Ortopedia e Reabilitação" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [showCategorias, setShowCategorias] = useState(false);
  const { totaleItens } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/loja?busca=${encodeURIComponent(search)}`;
    }
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-2 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+556235199974"
              className="flex items-center gap-1.5 hover:text-cyan-100 transition"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>(62) 3519-9974</span>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=556294896602"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-100 transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Compre pelo WhatsApp</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>Seg à Sex: 8h às 18h</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`bg-white/80 backdrop-blur-xl border-b border-gray-100 ${scrolled ? "py-2 shadow-lg shadow-gray-100/50" : "py-3"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src={placeholderImages.logo}
                alt="MedPlus Hospitalar"
                className="h-10 w-auto"
                width={140}
                height={40}
              />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden flex-1 max-w-2xl mx-4 md:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="O que você procura? (ex: máscara laríngea, luva, etc)"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 pl-12 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/minha-conta"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs text-gray-500">Minha Conta</p>
                  <p className="text-sm font-medium text-gray-900">Entrar</p>
                </div>
              </Link>

              <Link
                to="/carrinho"
                className="relative p-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {totaleItens > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                    {totaleItens}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-50"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 pl-10 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Categories Nav */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {/* All Categories Button */}
            <div className="relative">
              <button
                onClick={() => setShowCategorias(!showCategorias)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium rounded-t-lg hover:from-cyan-600 hover:to-cyan-700 transition"
              >
                <Menu className="h-4 w-4" />
                Todas as Categorias
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showCategorias ? "rotate-180" : ""}`}
                />
              </button>

              {/* Categories Dropdown */}
              {showCategorias && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-b-xl shadow-xl border border-gray-100 py-2 z-50">
                  {categorias.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/loja/categoria/${cat.slug}`}
                      onClick={() => setShowCategorias(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition"
                    >
                      {cat.nome}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-0.5 ml-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-cyan-600 rounded-lg transition"
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2"></div>
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Categorias</p>
              {categorias.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/loja/categoria/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition"
                >
                  {cat.nome}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
