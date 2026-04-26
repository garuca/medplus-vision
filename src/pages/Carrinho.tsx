import { Link, useLocation } from "wouter";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Carrinho() {
  const [, setLocation] = useLocation();
  const { itens, atualizarQuantidade, removerProduto, subtotal, totaleItens } = useCart();

  if (itens.length === 0) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-bold">Seu carrinho está vazio</h2>
          <p className="mt-2 text-muted-foreground">Adicione produtos para continuar</p>
          <Link to="/loja" className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
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
                  <img src={item.produto.imagem} alt={item.produto.nome} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">{item.produto.marca}</span>
                      <h3 className="font-medium">{item.produto.nome}</h3>
                    </div>
                    <button onClick={() => removerProduto(item.produto.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)} className="glass-card p-2 rounded-lg hover:bg-primary/10">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                      <button onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)} className="glass-card p-2 rounded-lg hover:bg-primary/10">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      {item.produto.precoPromocional ? (
                        <p className="font-bold text-primary">
                          R$ {(item.produto.precoPromocional * item.quantidade).toFixed(2).replace(".", ",")}
                        </p>
                      ) : (
                        <p className="font-bold text-primary">
                          R$ {(item.produto.preco * item.quantidade).toFixed(2).replace(".", ",")}
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
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totaleItens} itens)</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>calculate no checkout</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
              <button onClick={() => setLocation("/checkout")} className="mt-6 w-full btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">
                Finalizar Compra <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/loja" className="mt-3 w-full btn-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}