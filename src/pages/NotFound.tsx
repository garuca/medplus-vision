import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md p-10 text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <Link href="/" className="btn-primary mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold">Voltar ao início</Link>
      </div>
    </div>
  );
}