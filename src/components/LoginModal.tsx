import { useState } from "react";
import { X, Mail, Lock, User, Loader2, FileText, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    return digits
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
};

const validateCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(digits[9]) !== digit1) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(digits[10]) === digit2;
  } else if (digits.length === 14) {
    let sum = 0,
      weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) sum += parseInt(digits[i]) * weight[i + 1];
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(digits[12]) !== digit1) return false;
    sum = 0;
    weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) sum += parseInt(digits[i]) * weight[i];
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(digits[13]) === digit2;
  }
  return false;
};

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
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
      if (!validateCpfCnpj(cpfCnpj)) {
        setError("CPF ou CNPJ inválido");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, nome, cpfCnpj);
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
    setCpfCnpj("");
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
          {mode === "signup" && (
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                required
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                placeholder="CPF ou CNPJ"
                maxLength={18}
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
              type={mostrarSenha ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
