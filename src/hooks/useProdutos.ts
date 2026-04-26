import { useState, useEffect } from "react";
import { useDataSource } from "./useDataSource";
import { supabase } from "../lib/supabase";
import { products as produtosLocais } from "../data/produtos";

interface ProdutoFormatado {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  precoPromocional?: number;
  imagem: string;
  imagemPrincipal?: string;
  imagensSecundarias?: string[];
  imagemSecundarias?: string[];
  categoria: string;
  marca?: string;
  sku: string;
  estoque: number;
  dimensoes: { altura: number; largura: number; comprimento: number };
  peso: number;
  destaque?: boolean;
  ativo?: boolean;
}

export function useProdutos() {
  const { source } = useDataSource();
  const [produtos, setProdutos] = useState<ProdutoFormatado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProdutos();
  }, [source]);

  const loadProdutos = async () => {
    setLoading(true);
    setError(null);

    try {
      if (source === "supabase") {
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("ativo", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formatados = (data || []).map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
          preco: Number(p.preco),
          precoOriginal: p.preco_original ? Number(p.preco_original) : undefined,
          precoPromocional: p.preco_original && Number(p.preco_original) > Number(p.preco) ? Number(p.preco) : undefined,
          imagem: p.imagem_principal,
          imagemPrincipal: p.imagem_principal,
          imagensSecundarias: p.imagens_secundarias || [],
          imagemSecundarias: p.imagens_secundarias || [],
          categoria: p.categoria,
          marca: "MedPlus",
          sku: p.sku,
          estoque: p.estoque,
          dimensoes: p.dimensoes || { altura: 0, largura: 0, comprimento: 0 },
          peso: Number(p.peso) || 0,
          destaque: p.destaque,
          ativo: p.ativo,
        }));

        setProdutos(formatados);
      } else {
        setProdutos(produtosLocais);
      }
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setError("Erro ao carregar produtos");
      setProdutos(produtosLocais);
    } finally {
      setLoading(false);
    }
  };

  return { produtos, loading, error, refresh: loadProdutos };
}

export function useProdutoById(id: string) {
  const { source } = useDataSource();
  const [produto, setProduto] = useState<ProdutoFormatado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProduto();
  }, [id, source]);

  const loadProduto = async () => {
    setLoading(true);
    setError(null);

    try {
      if (source === "supabase") {
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setProduto({
            id: data.id,
            nome: data.nome,
            descricao: data.descricao,
            preco: Number(data.preco),
            precoOriginal: data.preco_original ? Number(data.preco_original) : undefined,
            precoPromocional: data.preco_original && Number(data.preco_original) > Number(data.preco) ? Number(data.preco) : undefined,
            imagem: data.imagem_principal,
            imagemPrincipal: data.imagem_principal,
            imagensSecundarias: data.imagens_secundarias || [],
            imagemSecundarias: data.imagens_secundarias || [],
            categoria: data.categoria,
            marca: "MedPlus",
            sku: data.sku,
            estoque: data.estoque,
            dimensoes: data.dimensoes || { altura: 0, largura: 0, comprimento: 0 },
            peso: Number(data.peso) || 0,
            destaque: data.destaque,
            ativo: data.ativo,
          });
        }
      } else {
        const p = produtosLocais.find((p) => p.id === id);
        if (p) setProduto(p);
      }
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      setError("Erro ao carregar produto");
      const p = produtosLocais.find((p) => p.id === id);
      if (p) setProduto(p);
    } finally {
      setLoading(false);
    }
  };

  return { produto, loading, error };
}