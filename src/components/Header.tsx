import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/medplus-logo.png";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`glass-nav sticky top-0 z-50 w-full transition-all ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MedPlus Hospitalar" className="h-10 w-auto" width={120} height={40} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60 hover:text-primary"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-semibold text-primary bg-white/70" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contato"
            className="btn-primary inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Fale Conosco
          </Link>
        </div>

        <button
          className="rounded-full p-2 text-foreground md:hidden glass"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 mt-3 glass-strong p-4">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/85 hover:bg-white/70 hover:text-primary"
                  activeProps={{ className: "rounded-xl px-4 py-2.5 text-sm font-semibold text-primary bg-white/80" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Fale Conosco
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
