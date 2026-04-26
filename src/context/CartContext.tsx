import { createContext, useContext, useState, ReactNode } from "react";

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  imagem: string;
  imagens?: string[];
  categoria: string;
  subcategoria?: string;
  marca?: string;
  sku?: string;
  estoque: number;
  especificacoes?: Record<string, string>;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface CartContextType {
  itens: ItemCarrinho[];
  adicionarProduto: (produto: Produto, quantidade?: number) => void;
  removerProduto: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void;
  limparCarrinho: () => void;
  totaleItens: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarProduto = (produto: Produto, quantidade = 1) => {
    setItens((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prev, { produto, quantidade }];
    });
  };

  const removerProduto = (id: string) => {
    setItens((prev) => prev.filter((item) => item.produto.id !== id));
  };

  const atualizarQuantidade = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerProduto(id);
      return;
    }
    setItens((prev) =>
      prev.map((item) =>
        item.produto.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => setItens([]);

  const totaleItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotal = itens.reduce(
    (acc, item) =>
      acc +
      (item.produto.precoPromocional || item.produto.preco) * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        limparCarrinho,
        totaleItens,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return contexto;
}