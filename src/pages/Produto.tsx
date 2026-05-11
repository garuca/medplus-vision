import { Link, useRoute } from "wouter";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  Heart,
  Share2,
  Check,
  MessageCircle,
  ShoppingCart,
  Truck,
  CreditCard,
  Lock,
  Loader2,
  Search,
  Package,
  Clock,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProdutoById } from "../hooks/useProdutos";
import { useAdminStorage } from "../hooks/useAdminStorage";
import { calcularFrete, formatarFrete } from "../lib/frete";
import type { FreteOpcao } from "../lib/frete";

export default function Produto() {
  const [match, params] = useRoute("/produto/:id");
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const [cepFrete, setCepFrete] = useState("");
  const [opcoesFrete, setOpcoesFrete] = useState<FreteOpcao[]>([]);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState("");
  const { adicionarProduto } = useCart();

  const productId = params?.id || "";
  const { produto, loading, error } = useProdutoById(productId);
  const { config } = useAdminStorage();

  const handleWhatsApp = () => {
    if (!produto?.nome) return;
    const preco = produto.precoPromocional || produto.preco || 0;
    const msg = `Olá, tenho interesse no produto: ${produto.nome}\nQuantidade: ${quantidade}\nValor: R$ ${preco.toFixed(2)}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=5562994896602?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const calcularFreteProduto = async () => {
    if (!produto || cepFrete.replace(/\D/g, "").length < 8 || !config.frete?.tokenMelhorEnvio)
      return;
    setCalculandoFrete(true);
    setErroFrete("");
    const dim = produto.dimensoes || { altura: 0, largura: 0, comprimento: 0 };
    const result = await calcularFrete(
      cepFrete,
      config.frete.cepOrigem,
      [
        {
          id: produto.id,
          width: dim.largura || 10,
          height: dim.altura || 10,
          length: dim.comprimento || 10,
          weight: produto.peso || 0.3,
          quantity: quantidade,
          insurance_value: produto.precoPromocional || produto.preco,
        },
      ],
      config.frete.tokenMelhorEnvio,
    );
    setOpcoesFrete(result.opcoes);
    setErroFrete(result.erro || "");
    setCalculandoFrete(false);
  };

  useEffect(() => {
    if (opcoesFrete.length > 0) calcularFreteProduto();
  }, [quantidade]);

  const todasImagens =
    produto?.imagemPrincipal || produto?.imagem
      ? [
          produto.imagemPrincipal || produto.imagem,
          ...(produto.imagensSecundarias || produto.imagemSecundarias || []),
        ]
      : [];
  const imagemAtual = todasImagens[imagemSelecionada] || todasImagens[0] || "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-muted-foreground">Produto não encontrado</p>
        <Link to="/loja" className="text-primary hover:underline">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const relatedProducts = []; // será popululado via hook se necessário

  return (
    <>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/loja"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>

          {/* Benefícios - Versão Compacta */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Compra segura
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Imagem - Otimizada */}
            <div className="relative flex flex-col gap-3">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/80 shadow-xl shadow-blue-500/5">
                <img
                  src={imagemAtual}
                  alt={produto.nome}
                  className="h-full w-full object-contain p-4"
                />
              </div>
              {/* Miniaturas */}
              {todasImagens.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {todasImagens.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImagemSelecionada(i)}
                      className={`h-14 w-14 rounded-lg border-2 transition-all ${i === imagemSelecionada ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50"} bg-white/60`}
                    >
                      <img
                        src={img}
                        alt={`Vista ${i + 1}`}
                        className="h-full w-full object-contain rounded-md"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info - Compacta */}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {produto.marca}
              </span>
              <h1 className="mt-1 text-xl font-bold text-foreground leading-tight">
                {produto.nome}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary">
                  R$ {(produto.precoPromocional || produto.preco).toFixed(2).replace(".", ",")}
                </span>
                {produto.precoPromocional && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {produto.preco.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {produto.precoPromocional && (
                <p className="text-xs text-green-600 font-medium">
                  {Math.round(((produto.preco - produto.precoPromocional) / produto.preco) * 100)}%
                  OFF
                </p>
              )}

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="glass-card p-2 rounded-lg hover:bg-primary/10"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantidade(Math.max(1, val));
                    }}
                    className="w-16 text-center font-semibold bg-transparent border border-border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="glass-card p-2 rounded-lg hover:bg-primary/10"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{produto.estoque} disponíveis</span>
              </div>

              {quantidade > produto.estoque && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Quantidade solicitada ({quantidade}) acima do estoque disponível (
                    {produto.estoque}).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Olá, gostaria de consultar sobre a disponibilidade de ${quantidade} unidades do produto: ${produto.nome}`,
                      );
                      window.open(`https://wa.me/5562994896602?text=${msg}`, "_blank");
                    }}
                    className="mt-2 text-sm font-medium text-primary hover:underline"
                  >
                    Consultar um vendedor
                  </button>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Adicionando produto:", produto);
                    const produtoParaCarrinho = {
                      id: produto.id,
                      nome: produto.nome,
                      descricao: produto.descricao || "",
                      preco: produto.precoPromocional || produto.preco,
                      precoPromocional: produto.precoPromocional,
                      imagem: produto.imagemPrincipal || produto.imagem || "",
                      imagens: produto.imagensSecundarias || produto.imagemSecundarias || [],
                      categoria: produto.categoria,
                      marca: produto.marca || "MedPlus",
                      sku: produto.sku || "",
                      estoque: produto.estoque || 0,
                      especificacoes: produto.especificacoes || {},
                      dimensoes: produto.dimensoes,
                      peso: produto.peso,
                    };
                    adicionarProduto(produtoParaCarrinho, quantidade);
                  }}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
                >
                  <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
                </button>
                <button className="glass-card p-3 rounded-full hover:bg-red-50">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="glass-card p-3 rounded-full hover:bg-blue-50">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleWhatsApp}
                className="mt-3 w-full btn-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
              >
                <MessageCircle className="h-5 w-5" /> Comprar pelo WhatsApp
              </button>

              {/* Calcular Frete */}
              <div className="mt-6 glass-card p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" /> Calcular Frete
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cepFrete}
                    onChange={(e) => setCepFrete(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    placeholder="Digite seu CEP"
                    maxLength={8}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                  <button
                    onClick={calcularFreteProduto}
                    disabled={calculandoFrete || cepFrete.replace(/\D/g, "").length < 8}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
                  >
                    {calculandoFrete ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-4 w-4" /> Calcular
                      </>
                    )}
                  </button>
                </div>
                {opcoesFrete.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {opcoesFrete.map((opcao, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{opcao.servico}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {opcao.prazo} dias úteis
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {formatarFrete(opcao.preco)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {erroFrete && <p className="mt-2 text-xs text-red-500">{erroFrete}</p>}
                {!config.frete?.tokenMelhorEnvio && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Configure o token Melhor Envio no admin para calcular fretes reais
                  </p>
                )}
              </div>

              {/* Descrição - Above fold */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{produto.descricao}</p>
              </div>

              {/* Especificações */}
              <div className="mt-6 glass-card p-4">
                <h3 className="font-semibold mb-3">Especificações Técnicas</h3>
                {produto.especificacoes ? (
                  <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {produto.especificacoes}
                  </div>
                ) : Object.entries(produto.especificacoes || {}).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(produto.especificacoes || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma especificação técnica disponível.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Produtos Relacionados */}
          {/* <div className="mt-12">
             <h2 className="text-xl font-bold mb-6">Produtos Relacionados</h2>
             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
               {relatedProducts.map((p) => (
                 <Link key={p.id} to={`/produto/${p.id}`} className="glass-card group p-3">
                   <div className="aspect-square overflow-hidden rounded-xl bg-white/50">
                     <img
                       src={p.imagem}
                       alt={p.nome}
                       className="h-full w-full object-cover transition-transform group-hover:scale-105"
                     />
                   </div>
                   <h3 className="mt-3 text-sm font-medium line-clamp-2">{p.nome}</h3>
                   <p className="mt-1 font-bold text-primary">
                     R$ {(p.precoPromocional || p.preco).toFixed(2).replace(".", ",")}
                   </p>
                 </Link>
               ))}
             </div>
           </div> */}
        </div>
      </section>
    </>
  );
}
