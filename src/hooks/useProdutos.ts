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

        const imageMap: Record<string, string> = {
          MLP001:
            "/mascara_laringea_de_pvc_todos_os_tamanhos_hospicenter_2247_1_f7363858d40de5a1970efde52d7efa86.webp",
          TSE001: "/tubo_sonda_endotraqueal_com_balao_2249_1_afd2596d447d58e9ff052e3227147b4a.webp",
          MFA001:
            "/mascara_facial_de_anestesia_com_coxim_inflavel_915_1_5946af7724155463fce6ded3aeda52c9.webp",
          HMEF001: "/filtro_hmef_adulto_48hs_3876_1_a0a1861557993bc3059bb63cce466670.webp",
          CNO001:
            "/cateter_nasal_de_oxigenio_tipo_oculos_2245_1_4f9c21c885229a29a3a2ca7c429f3a87.webp",
          COG001:
            "/canula_orofaringea_guedel_para_via_aerea_3013_1_7a4c993cc673c3a0b59fbf8b321e7038.webp",
          MOAC001:
            "/mascara_de_oxigenio_de_alta_concentracao_com_reservatorio_hospicenter_81_1_6649d6a6a70caa32f2f93dbd1e4d7671.webp",
          RMB001: "/reanimador_manual_em_pvc_ambu_2259_1_e04d7c09a045f640175ff8416f612c55.webp",
          CBB001: "/cabo_de_bisturi_cirrgico_n_3_e_n_4_1_20251104224015_e7676fae77ca.webp",
          MTR001:
            "/manta_trmica_aluminizada_para_resgate_e_aqueciment_1_20260126151642_e2b52d6aa0ee.webp",
          "máscara-n95-001":
            "/mascara_laringea_de_pvc_todos_os_tamanhos_hospicenter_2247_1_f7363858d40de5a1970efde52d7efa86.webp",
        };

        const formatados = (data || []).map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
          preco: Number(p.preco),
          precoOriginal: p.preco_original ? Number(p.preco_original) : undefined,
          precoPromocional:
            p.preco_original && Number(p.preco_original) > Number(p.preco)
              ? Number(p.preco)
              : undefined,
          imagem:
            p.imagem_principal ||
            imageMap[p.sku] ||
            "/mascara_laringea_de_pvc_todos_os_tamanhos_hospicenter_2247_1_f7363858d40de5a1970efde52d7efa86.webp",
          imagemPrincipal:
            p.imagem_principal ||
            imageMap[p.sku] ||
            "/assets/mascara_laringea_de_pvc_todos_os_tamanhos_hospicenter_2247_1_f7363858d40de5a1970efde52d7efa86.webp",
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
        try {
          const { data, error } = await supabase.from("produtos").select("*").eq("id", id).single();

          if (error) throw error;

          if (data) {
            setProduto({
              id: data.id,
              nome: data.nome,
              descricao: data.descricao,
              preco: Number(data.preco),
              precoOriginal: data.preco_original ? Number(data.preco_original) : undefined,
              precoPromocional: data.preco_promocional ? Number(data.preco_promocional) : undefined,
              imagem: data.imagem || "/placeholder.png",
              imagemPrincipal: data.imagem_principal || data.imagem || "",
              imagensSecundarias: data.imagens_secundarias || [],
              categoria: data.categoria,
              subcategoria: data.subcategoria || "",
              marca: data.marca || "",
              sku: data.sku,
              estoque: data.estoque,
              dimensoes: data.dimensoes || { altura: 0, largura: 0, comprimento: 0 },
              peso: Number(data.peso) || 0,
              destaque: data.destaque,
              ativo: data.ativo,
            });
            setLoading(false);
            return;
          }
        } catch (supabaseError) {
          console.log("Supabase indisponível, usando produtos locais");
        }
      }

      const p = produtosLocais.find((p) => p.id === id);
      if (p) {
        setProduto(p);
      } else {
        setError("Produto não encontrado");
      }
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      const p = produtosLocais.find((p) => p.id === id);
      if (p) setProduto(p);
      else setError("Produto não encontrado");
    } finally {
      setLoading(false);
    }
  };

  return { produto, loading, error };
}
