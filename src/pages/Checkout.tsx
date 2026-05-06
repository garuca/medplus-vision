import { Link } from "wouter";
import { useState, useCallback } from "react";
import {
  Check,
  MapPin,
  CreditCard,
  Truck,
  MessageCircle,
  ArrowRight,
  Search,
  Loader2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { MercadoPagoCheckout, MercadoPagoBadge } from "../components/MercadoPagoCheckoutPro";
import {
  useCep,
  formatarCpf,
  formatarCnpj,
  formatarTelefone,
  validarCpf,
  validarCnpj,
} from "../lib/cep";

interface DadosCliente {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  tipoPessoa: "cpf" | "cnpj";
  CEP: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pagamento: "whatsapp" | "mercadopago";
}

export default function Checkout() {
  const { itens, subtotal, limparCarrinho } = useCart();
  const { user, signIn } = useAuth();
  const [passo, setPasso] = useState(1);
  const [pedidoConcluido, setPedidoConcluido] = useState(false);
  const [codigoPedido, setCodigoPedido] = useState("");
  const [mpPaymentId, setMpPaymentId] = useState("");
  const [docValido, setDocValido] = useState<boolean | null>(null);
  const { buscarCep, loading: loadingCep } = useCep();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginErro, setLoginErro] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [dados, setDados] = useState<DadosCliente>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    tipoPessoa: "cpf",
    CEP: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pagamento: "whatsapp",
  });

  const handleBuscarCep = useCallback(async () => {
    if (dados.CEP.length >= 8) {
      const resultado = await buscarCep(dados.CEP);
      if (resultado) {
        setDados((prev) => ({
          ...prev,
          endereco: resultado.logradouro,
          bairro: resultado.bairro,
          cidade: resultado.cidade,
          estado: resultado.estado,
          complemento: resultado.complemento,
        }));
      }
    }
  }, [dados.CEP, buscarCep]);

  const handleDocumentoChange = (value: string) => {
    const formatted = dados.tipoPessoa === "cpf" ? formatarCpf(value) : formatarCnpj(value);
    setDados({ ...dados, documento: formatted });

    const numeros = value.replace(/\D/g, "");
    if (dados.tipoPessoa === "cpf" && numeros.length === 11) {
      setDocValido(validarCpf(value));
    } else if (dados.tipoPessoa === "cnpj" && numeros.length === 14) {
      setDocValido(validarCnpj(value));
    } else {
      setDocValido(null);
    }
  };

  const handleTelefoneChange = (value: string) => {
    setDados({ ...dados, telefone: formatarTelefone(value) });
  };

  const handleTipoPessoaChange = (tipo: "cpf" | "cnpj") => {
    setDados({ ...dados, tipoPessoa: tipo, documento: "" });
    setDocValido(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dados.pagamento === "mercadopago") {
      return;
    }
    if (passo < 3) {
      setPasso(passo + 1);
      return;
    }
    const codigo = "MED" + Date.now().toString().slice(-8);
    setCodigoPedido(codigo);
    setPedidoConcluido(true);
    limparCarrinho();
  };

  const handleWhatsApp = () => {
    const itensLista = itens.map((i) => `${i.quantidade}x ${i.produto.nome}`).join("\n");
    const docLabel = dados.tipoPessoa === "cpf" ? "CPF" : "CNPJ";
    const msg = `*NOVO PEDIDO - ${codigoPedido}*\n\n*Itens:*\n${itensLista}\n\n*Total:* R$ ${subtotal.toFixed(2)}\n\n*Cliente:* ${dados.nome}\n${dados.email}\n${dados.telefone}\n${docLabel}: ${dados.documento}\n\n*Endereço:* ${dados.endereco}, ${dados.numero} - ${dados.bairro}, ${dados.cidade}-${dados.estado}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=55556294896602&text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const handleMpSuccess = (paymentId: string) => {
    setMpPaymentId(paymentId);
    const codigo = "MED" + Date.now().toString().slice(-8);
    setCodigoPedido(codigo);
    setPedidoConcluido(true);
    limparCarrinho();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginErro("");
    const { error } = await signIn(loginEmail, loginSenha);
    if (error) {
      setLoginErro(error.message);
    }
    setLoginLoading(false);
  };

  if (pedidoConcluido) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Pedido Concluído!</h2>
          <p className="mt-2 text-muted-foreground">Seu pagamento foi processado com sucesso.</p>
          <div className="mt-6 glass-card p-4 inline-block">
            <p className="text-sm text-muted-foreground">Código do Pedido</p>
            <p className="text-2xl font-bold text-primary">{codigoPedido}</p>
          </div>
          {mpPaymentId && (
            <p className="mt-2 text-sm text-muted-foreground">ID Pagamento: {mpPaymentId}</p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Um e-mail de confirmação foi enviado para {dados.email}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
            </button>
            <Link
              to="/loja"
              className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (itens.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold">Seu carrinho está vazio</h2>
          <Link
            to="/loja"
            className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 font-semibold"
          >
            Ver Produtos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>

        <div className="mb-8 flex items-center gap-4">
          {[1, 2, 3].map((p) => (
            <div
              key={p}
              className={`flex items-center gap-2 ${passo >= p ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${passo >= p ? "bg-primary text-white" : "bg-muted"}`}
              >
                {p === 1 ? (
                  <MapPin className="h-4 w-4" />
                ) : p === 2 ? (
                  <Truck className="h-4 w-4" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
              </div>
              <span className="text-sm hidden sm:inline">
                {p === 1 ? "Dados" : p === 2 ? "Entrega" : "Pagamento"}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {passo === 1 && (
              <div className="space-y-4">
                {!user && (
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="font-medium text-sm">Já é cliente?</p>
                        <p className="text-xs text-muted-foreground">
                          Entre para preencher automaticamente
                        </p>
                      </div>
                      <form onSubmit={handleLoginSubmit} className="flex gap-2 items-end">
                        <div className="flex gap-1">
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="E-mail"
                            className="w-28 text-sm px-2 py-1.5 rounded-lg border"
                          />
                          <input
                            type="password"
                            value={loginSenha}
                            onChange={(e) => setLoginSenha(e.target.value)}
                            placeholder="Senha"
                            className="w-20 text-sm px-2 py-1.5 rounded-lg border"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loginLoading || !loginEmail || !loginSenha}
                          className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg disabled:opacity-50"
                        >
                          {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
                        </button>
                      </form>
                    </div>
                    {loginErro && <p className="text-xs text-red-500 mt-2">{loginErro}</p>}
                    <p className="text-xs text-muted-foreground mt-2">
                      Ou{" "}
                      <Link href="/cadastro" className="text-primary hover:underline">
                        crie uma conta
                      </Link>{" "}
                      para acompanhar seus pedidos
                    </p>
                  </div>
                )}
                <div className="glass-card p-6">
                  <h2 className="text-lg font-bold mb-4">Dados do Cliente</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Nome Completo / Razão Social</label>
                      <input
                        required
                        type="text"
                        value={dados.nome}
                        onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder={dados.tipoPessoa === "cpf" ? "Seu nome" : "Nome da empresa"}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">E-mail</label>
                      <input
                        required
                        type="email"
                        value={dados.email}
                        onChange={(e) => setDados({ ...dados, email: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <input
                        required
                        type="tel"
                        value={dados.telefone}
                        onChange={(e) => handleTelefoneChange(e.target.value)}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="(62) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tipo de Pessoa</label>
                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleTipoPessoaChange("cpf")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            dados.tipoPessoa === "cpf"
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          CPF
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTipoPessoaChange("cnpj")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            dados.tipoPessoa === "cnpj"
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          CNPJ
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        {dados.tipoPessoa === "cpf" ? "CPF" : "CNPJ"}
                      </label>
                      <input
                        required
                        type="text"
                        value={dados.documento}
                        onChange={(e) => handleDocumentoChange(e.target.value)}
                        className={`glass-input mt-1 w-full rounded-xl px-4 py-3 ${
                          docValido === false ? "border-red-500" : ""
                        }`}
                        placeholder={
                          dados.tipoPessoa === "cpf" ? "000.000.000-00" : "00.000.000/0001-00"
                        }
                      />
                      {docValido === false && (
                        <p className="text-xs text-red-500 mt-1">Documento inválido</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">CEP</label>
                      <div className="flex gap-2">
                        <input
                          required
                          type="text"
                          value={dados.CEP}
                          onChange={(e) => setDados({ ...dados, CEP: e.target.value })}
                          onBlur={handleBuscarCep}
                          className="glass-input mt-1 flex-1 rounded-xl px-4 py-3"
                          placeholder="00000-000"
                        />
                        <button
                          type="button"
                          onClick={handleBuscarCep}
                          disabled={loadingCep || dados.CEP.length < 8}
                          className="mt-1 px-4 py-2 bg-primary text-white rounded-xl disabled:opacity-50"
                        >
                          {loadingCep ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Search className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Endereço</label>
                      <input
                        required
                        type="text"
                        value={dados.endereco}
                        onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Número</label>
                      <input
                        required
                        type="text"
                        value={dados.numero}
                        onChange={(e) => setDados({ ...dados, numero: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Complemento</label>
                      <input
                        type="text"
                        value={dados.complemento}
                        onChange={(e) => setDados({ ...dados, complemento: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="Apto, sala, etc."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bairro</label>
                      <input
                        required
                        type="text"
                        value={dados.bairro}
                        onChange={(e) => setDados({ ...dados, bairro: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="Bairro"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cidade</label>
                      <input
                        required
                        type="text"
                        value={dados.cidade}
                        onChange={(e) => setDados({ ...dados, cidade: e.target.value })}
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="Cidade"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Estado</label>
                      <input
                        required
                        type="text"
                        value={dados.estado}
                        onChange={(e) =>
                          setDados({ ...dados, estado: e.target.value.toUpperCase() })
                        }
                        className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                        placeholder="GO"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {passo === 2 && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">Opções de Entrega</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-primary bg-primary/5">
                    <input type="radio" name="entrega" defaultChecked className="mt-1" />
                    <div>
                      <p className="font-semibold">PAC</p>
                      <p className="text-sm text-muted-foreground">5 a 7 dias úteis - R$ 15,00</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-border">
                    <input type="radio" name="entrega" className="mt-1" />
                    <div>
                      <p className="font-semibold">Sedex</p>
                      <p className="text-sm text-muted-foreground">1 a 2 dias úteis - R$ 25,00</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-border">
                    <input type="radio" name="entrega" className="mt-1" />
                    <div>
                      <p className="font-semibold">Retirada na Loja</p>
                      <p className="text-sm text-muted-foreground">Após confirmação -gratuito</p>
                      <p className="text-xs text-muted-foreground">
                        Av. Zoroastro Artiaga, QD 09 LT44 - Cruzeiro do Sul, Aparecida de Goiânia -
                        GO
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {passo === 3 && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">Forma de Pagamento</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-primary bg-primary/5">
                    <input
                      type="radio"
                      name="pagamento"
                      value="whatsapp"
                      checked={dados.pagamento === "whatsapp"}
                      onChange={(e) =>
                        setDados({ ...dados, pagamento: e.target.value as "whatsapp" })
                      }
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        Pagamento via WhatsApp após confirmação
                      </p>
                    </div>
                  </label>
                  <div className="p-4 rounded-xl border-2 border-[#0097D7] bg-[#0097D7]/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pagamento"
                        value="mercadopago"
                        checked={dados.pagamento === "mercadopago"}
                        onChange={(e) =>
                          setDados({ ...dados, pagamento: e.target.value as "mercadopago" })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2">
                          Mercado Pago
                          <span className="text-xs bg-[#0097D7] text-white px-2 py-0.5 rounded-full">
                            NOVO
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pagamento online com cartão, PIX ou boleto
                        </p>
                        {dados.pagamento === "mercadopago" && dados.email && (
                          <div className="mt-4">
                            <MercadoPagoCheckout
                              amount={subtotal}
                              items={itens}
                              customerEmail={dados.email}
                            />
                          </div>
                        )}
                        <div className="mt-2">
                          <MercadoPagoBadge />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {itens.map((item) => (
                  <div key={item.produto.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantidade}x {item.produto.nome.slice(0, 20)}...
                    </span>
                    <span>
                      R${" "}
                      {((item.produto.precoPromocional || item.produto.preco) * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              {dados.pagamento !== "mercadopago" && (
                <button
                  type="submit"
                  className="mt-6 w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
                >
                  {passo === 3 ? "Confirmar Pedido" : "Continuar"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
