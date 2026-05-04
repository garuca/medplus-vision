import { Link, useRoute } from "wouter";
import { useState } from "react";
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
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProdutoById } from "../hooks/useProdutos";
import { useDataSource } from "../hooks/useDataSource";
import { MercadoPagoCheckout } from "../components/MercadoPagoCheckoutPro";

export default function Produto() {
  const [match, params] = useRoute("/produto/:id");
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const { adicionarProduto } = useCart();

  const productId = params?.id || "";
  const { produto, loading, error } = useProdutoById(productId);

  const handleWhatsApp = () => {
    if (!produto) return;
    const msg = `Olá, tenho interesse no produto: ${produto.nome}\nQuantidade: ${quantidade}\nValor: R$ ${(produto.precoPromocional || produto.preco).toFixed(2)}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=55556299981212?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  // Get all images for this product
  const todasImagens = produto
    ? [
        produto.imagemPrincipal || produto.imagem,
        ...(produto.imagensSecundarias || produto.imagemSecundarias || []),
      ]
    : [];

  const imagemAtual = todasImagens[imagemSelecionada] || todasImagens[0];

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
              <Truck className="h-3 w-3" /> Frete Grátis R$ 499,90+
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> 15% desconto à vista
            </span>
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

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  em até{" "}
                  <span className="font-semibold text-foreground">
                    {Math.ceil((produto.precoPromocional || produto.preco) / 2)}x
                  </span>{" "}
                  de R${" "}
                  {((produto.precoPromocional || produto.preco) / 2).toFixed(2).replace(".", ",")}{" "}
                  sem juros
                </p>
                <p className="text-sm text-green-600">
                  ou R$ {(produto.precoPromocional || produto.preco).toFixed(2).replace(".", ",")} à
                  vista
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="glass-card p-2 rounded-lg hover:bg-primary/10"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="glass-card p-2 rounded-lg hover:bg-primary/10"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{produto.estoque} disponíveis</span>
              </div>

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

              {/* Mercado Pago Checkout Pro - SDK Oficial */}
              <div className="mt-6">
                <MercadoPagoCheckout amount={produto.precoPromocional || produto.preco} />
              </div>

              {/* Descrição - Above fold */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{produto.descricao}</p>
              </div>

              {/* Especificações */}
              <div className="mt-6 glass-card p-4">
                <h3 className="font-semibold mb-3">Especificações Técnicas</h3>
                <div className="space-y-2">
                  {Object.entries(produto.especificacoes || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Produtos Relacionados */}
          <div className="mt-12">
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
          </div>
        </div>
      </section>
    </>
  );
}
