import { Link } from "wouter";
import { useState } from "react";
import { Check, MapPin, CreditCard, Truck, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { MercadoPagoPaymentForm, MercadoPagoBadge } from "../components/MercadoPagoButton";

export default function Checkout() {
  const { itens, subtotal, limparCarrinho } = useCart();
  const [passo, setPasso] = useState(1);
  const [pedidoConcluido, setPedidoConcluido] = useState(false);
  const [codigoPedido, setCodigoPedido] = useState("");
  const [dados, setDados] = useState({
    nome: "", email: "", telefone: "",
    CPF: "", CEP: "", endereco: "", numero: "", complemento: "",
    bairro: "", cidade: "", estado: "",
    pagamento: "whatsapp"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    const itensLista = itens.map(i => `${i.quantidade}x ${i.produto.nome}`).join("\n");
    const msg = `*NOVO PEDIDO - ${codigoPedido}*\n\n*Itens:*\n${itensLista}\n\n*Total:* R$ ${subtotal.toFixed(2)}\n\n*Cliente:* ${dados.nome}\n${dados.email}\n${dados.telefone}`;
    window.open(`https://api.whatsapp.com/send/?phone=55556299981212?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (pedidoConcluido) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Pedido Concluído!</h2>
          <p className="mt-2 text-muted-foreground">Seu pedido foi registrado com sucesso.</p>
          <div className="mt-6 glass-card p-4 inline-block">
            <p className="text-sm text-muted-foreground">Código do Pedido</p>
            <p className="text-2xl font-bold text-primary">{codigoPedido}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Um e-mail de confirmação foi enviado para {dados.email}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={handleWhatsApp} className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
              <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
            </button>
            <Link to="/loja" className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
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
          <Link to="/loja" className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 font-semibold">
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

        {/* Passos */}
        <div className="mb-8 flex items-center gap-4">
          {[1, 2, 3].map((p) => (
            <div key={p} className={`flex items-center gap-2 ${passo >= p ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${passo >= p ? "bg-primary text-white" : "bg-muted"}`}>
                {p === 1 ? <MapPin className="h-4 w-4" /> : p === 2 ? <Truck className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
              </div>
              <span className="text-sm hidden sm:inline">{p === 1 ? "Dados" : p === 2 ? "Entrega" : "Pagamento"}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Formulário */}
          <div className="lg:col-span-2">
            {passo === 1 && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-bold mb-4">Dados do Cliente</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <input required type="text" value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail</label>
                    <input required type="email" value={dados.email} onChange={e => setDados({...dados, email: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone</label>
                    <input required type="tel" value={dados.telefone} onChange={e => setDados({...dados, telefone: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="(62) 99999-9999" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CPF</label>
                    <input required type="text" value={dados.CPF} onChange={e => setDados({...dados, CPF: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CEP</label>
                    <input required type="text" value={dados.CEP} onChange={e => setDados({...dados, CEP: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="00000-000" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">Endereço</label>
                    <input required type="text" value={dados.endereco} onChange={e => setDados({...dados, endereco: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="Rua, Avenida, etc." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Número</label>
                    <input required type="text" value={dados.numero} onChange={e => setDados({...dados, numero: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="123" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Complemento</label>
                    <input type="text" value={dados.complemento} onChange={e => setDados({...dados, complemento: e.target.value})} className="glass-input mt-1 w-full rounded-xl px-4 py-3" placeholder="Apto, sala, etc." />
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
                      <p className="text-xs text-muted-foreground">Av. Zoroastro Artiaga, QD 09 LT44 - Cruzeiro do Sul, Aparecida de Goiânia - GO</p>
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
                    <input type="radio" name="pagamento" defaultChecked className="mt-1" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Pagamento via WhatsApp após confirmação</p>
                    </div>
                  </label>
                  <div className="p-4 rounded-xl border-2 border-[#0097D7] bg-[#0097D7]/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="pagamento" value="mercadopago" className="mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2">
                          Mercado Pago
                          <span className="text-xs bg-[#0097D7] text-white px-2 py-0.5 rounded-full">NOVO</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Pagamento online com cartão, PIX ou boleto</p>
                        <div className="mt-3">
                          <MercadoPagoPaymentForm amount={subtotal} onPayment={() => {
                            const mpScript = document.createElement("script");
                            mpScript.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
                            mpScript.setAttribute("data-preference-id", "TODO_CONFIGURAR");
                            mpScript.async = true;
                            document.body.appendChild(mpScript);
                          }} />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {itens.map((item) => (
                  <div key={item.produto.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.quantidade}x {item.produto.nome.slice(0, 20)}...</span>
                    <span>R$ {((item.produto.precoPromocional || item.produto.preco) * item.quantidade).toFixed(2).replace(".", ",")}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <button type="submit" className="mt-6 w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">
                {passo === 3 ? "Confirmar Pedido" : "Continuar"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}