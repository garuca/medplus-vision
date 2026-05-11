import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { FreteOpcao } from "../lib/frete";

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
  dimensoes?: { altura: number; largura: number; comprimento: number };
  peso?: number;
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
  freteSelecionado: FreteOpcao | null;
  setFreteSelecionado: (frete: FreteOpcao | null) => void;
  opcoesFrete: FreteOpcao[];
  setOpcoesFrete: (opcoes: FreteOpcao[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "medplus_carrinho";

function loadCartFromStorage(): ItemCarrinho[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const items: ItemCarrinho[] = JSON.parse(saved);
      return items.map((item) => ({
        ...item,
        produto: {
          ...item.produto,
          dimensoes: item.produto.dimensoes || { altura: 0, largura: 0, comprimento: 0 },
          peso: item.produto.peso || 0,
        },
      }));
    }
  } catch (e) {
    console.error("Erro ao carregar carrinho do localStorage:", e);
  }
  return [];
}

function saveCartToStorage(itens: ItemCarrinho[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itens));
  } catch (e) {
    console.error("Erro ao salvar carrinho no localStorage:", e);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(itens);
  }, [itens]);

  const adicionarProduto = (produto: Produto, quantidade = 1) => {
    setItens((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
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
      prev.map((item) => (item.produto.id === id ? { ...item, quantidade } : item)),
    );
  };

  const limparCarrinho = () => {
    setItens([]);
    setFreteSelecionado(null);
    setOpcoesFrete([]);
  };

  const [freteSelecionado, setFreteSelecionado] = useState<FreteOpcao | null>(null);
  const [opcoesFrete, setOpcoesFrete] = useState<FreteOpcao[]>([]);

  const totaleItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotal = itens.reduce(
    (acc, item) => acc + (item.produto.precoPromocional || item.produto.preco) * item.quantidade,
    0,
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
        freteSelecionado,
        setFreteSelecionado,
        opcoesFrete,
        setOpcoesFrete,
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
