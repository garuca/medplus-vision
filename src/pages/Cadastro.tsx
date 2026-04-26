import { Link, useLocation } from "wouter";
import { UserPlus } from "lucide-react";

export default function Cadastro() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/minha-conta");
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="glass-card p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Criar Conta</h2>
            <p className="mt-2 text-sm text-muted-foreground">Cadastre-se para acompanha seus pedidos</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Nome Completo</label>
              <input type="text" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="Seu nome" />
            </div>
            <div>
              <label className="text-sm font-medium">E-mail</label>
              <input type="email" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Telefone</label>
              <input type="tel" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="(62) 99999-9999" />
            </div>
            <div>
              <label className="text-sm font-medium">CPF</label>
              <input type="text" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="000.000.000-00" />
            </div>
            <div>
              <label className="text-sm font-medium">Senha</label>
              <input type="password" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirmar Senha</label>
              <input type="password" required className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full btn-primary rounded-full px-6 py-3 font-semibold">
              Criar Conta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}