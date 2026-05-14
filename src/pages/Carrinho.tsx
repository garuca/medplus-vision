import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Truck,
  Search,
  Loader2,
  Clock,
  Package,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAdminStorage } from "../hooks/useAdminStorage";
import { formatarPreco } from "../lib/format";
import { calcularFrete, formatarFrete } from "../lib/frete";
import type { FreteOpcao } from "../lib/frete";

export default function Carrinho() {
  const [, setLocation] = useLocation();
  const {
    itens,
    atualizarQuantidade,
    removerProduto,
    subtotal,
    totaleItens,
    freteSelecionado,
    setFreteSelecionado,
    opcoesFrete,
    setOpcoesFrete,
  } = useCart();
  const { config } = useAdminStorage();
  const [cepFrete, setCepFrete] = useState("");
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState("");
  const totalComFrete = freteSelecionado ? subtotal + freteSelecionado.preco : subtotal;

  useEffect(() => {
    if (opcoesFrete.length === 0 || itens.length === 0) return;
    handleCalcularFrete();
  }, [itens]);

  const handleCalcularFrete = async () => {
    const cep = cepFrete.replace(/\D/g, "");
    if (cep.length < 8 || !config.frete?.tokenMelhorEnvio) {
      console.warn(
        "Frete: CEP invalido ou token ausente",
        cep.length,
        !!config.frete?.tokenMelhorEnvio,
      );
      return;
    }
    setCalculandoFrete(true);
    setErroFrete("");
    const products = itens.map((item) => {
      const dim = item.produto.dimensoes || { altura: 0, largura: 0, comprimento: 0 };
      return {
        id: item.produto.id,
        width: dim.largura || 10,
        height: dim.altura || 10,
        length: dim.comprimento || 10,
        weight: item.produto.peso || 0.3,
        quantity: item.quantidade,
        insurance_value: item.produto.precoPromocional || item.produto.preco,
      };
    });
    const body = {
      from: { postal_code: config.frete.cepOrigem.replace(/\D/g, "") },
      to: { postal_code: cep },
      products,
    };
    console.log("Frete: enviando para API", JSON.stringify(body, null, 2));
    const result = await calcularFrete(
      cep,
      config.frete.cepOrigem,
      products,
      config.frete.tokenMelhorEnvio,
    );
    console.log("Frete: resultado", result);
    setOpcoesFrete(result.opcoes);
    setErroFrete(result.erro || "");
    setFreteSelecionado(null);
    setCalculandoFrete(false);
  };

  if (itens.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-bold">Seu carrinho está vazio</h2>
          <p className="mt-2 text-muted-foreground">Adicione produtos para continuar</p>
          <Link
            to="/loja"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Ver Produtos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Meu Carrinho ({totaleItens} itens)</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 space-y-4">
            {itens.map((item) => (
              <div key={item.produto.id} className="glass-card flex gap-4 p-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white/50">
                  <img
                    src={item.produto.imagem}
                    alt={item.produto.nome}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">{item.produto.marca}</span>
                      <h3 className="font-medium">{item.produto.nome}</h3>
                    </div>
                    <button
                      onClick={() => removerProduto(item.produto.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                        className="glass-card p-2 rounded-lg hover:bg-primary/10"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantidade}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          atualizarQuantidade(item.produto.id, Math.max(1, val));
                        }}
                        className="w-14 text-center font-semibold bg-transparent border border-border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                        className="glass-card p-2 rounded-lg hover:bg-primary/10"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    {item.quantidade > item.produto.estoque && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800">
                          Quantidade solicitada ({item.quantidade}) acima do estoque disponível (
                          {item.produto.estoque}).
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const msg = encodeURIComponent(
                              `Olá, gostaria de consultar sobre a disponibilidade de ${item.quantidade} unidades do produto: ${item.produto.nome}`,
                            );
                            window.open(`https://wa.me/5562994896602?text=${msg}`, "_blank");
                          }}
                          className="mt-1 text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="h-3 w-3" /> Consultar um vendedor
                        </button>
                      </div>
                    )}
                    <div className="text-right">
                      {item.produto.precoPromocional ? (
                        <p className="font-bold text-primary">
                          R$ {formatarPreco(item.produto.precoPromocional * item.quantidade)}
                        </p>
                      ) : (
                        <p className="font-bold text-primary">
                          R$ {formatarPreco(item.produto.preco * item.quantidade)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>

              {/* Calcular Frete */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Truck className="h-4 w-4 text-primary" /> Frete
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cepFrete}
                    onChange={(e) => setCepFrete(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    placeholder="CEP"
                    maxLength={8}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                  <button
                    onClick={handleCalcularFrete}
                    disabled={calculandoFrete || cepFrete.replace(/\D/g, "").length < 8}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                  >
                    {calculandoFrete ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {opcoesFrete.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {opcoesFrete.map((opcao, i) => (
                      <button
                        key={i}
                        onClick={() => setFreteSelecionado(opcao)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                          freteSelecionado?.servico === opcao.servico
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-muted/30 hover:bg-muted/50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Package className="h-3 w-3 text-muted-foreground shrink-0" />
                          <div className="text-left">
                            <p className="font-medium">{opcao.servico}</p>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {opcao.prazo} dias
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">{formatarFrete(opcao.preco)}</span>
                      </button>
                    ))}
                  </div>
                )}

                {erroFrete && (
                  <pre className="mt-2 text-xs text-red-500 whitespace-pre-wrap font-sans">
                    {erroFrete}
                  </pre>
                )}
                {!config.frete?.tokenMelhorEnvio && (
                  <p className="mt-2 text-xs text-muted-foreground">Configure o frete no admin</p>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totaleItens} itens)</span>
                  <span>R$ {formatarPreco(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>
                    {freteSelecionado ? formatarFrete(freteSelecionado.preco) : "Selecione o frete"}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">R$ {formatarPreco(totalComFrete)}</span>
                </div>
              </div>

              <button
                onClick={() => setLocation("/checkout")}
                className="mt-6 w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
              >
                Finalizar Compra <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/loja"
                className="mt-3 w-full btn-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
