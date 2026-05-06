import { useState } from "react";
import { X, Mail, Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signIn, signUp } = useAuth();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        onClose();
        setEmail("");
        setPassword("");
      }
    } else {
      const { error } = await signUp(email, password, nome);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
      }
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setSuccess("");
    setNome("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login"
              ? "Entre com sua conta para continuar"
              : "Cadastre-se para uma experiência personalizada"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={toggleMode} className="text-sm text-primary hover:underline">
            {mode === "login" ? "Não tem conta? Criar agora" : "Já tem conta? Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
