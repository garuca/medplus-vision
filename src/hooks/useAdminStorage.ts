import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { carregarPedidosAdmin, atualizarStatusPedido } from "../lib/pedidos";
import type { Produto, Categoria, Pedido, Configuracoes } from "../types/admin";

const STORAGE_KEYS = {
  auth: "medplus_admin_auth",
};

const defaultCategorias: Categoria[] = [
  { id: "1", nome: "Descartáveis", slug: "descartaveis", icone: "Gloves" },
  { id: "2", nome: "Equipamentos", slug: "equipamentos", icone: "Stethoscope" },
  { id: "3", nome: "EPIs", slug: "epis", icone: "Shield" },
  { id: "4", nome: "Curativos", slug: "curativos", icone: "Bandage" },
  { id: "5", nome: "Medicamentos", slug: "medicamentos", icone: "Pill" },
  { id: "6", nome: "Mobiliário", slug: "mobiliario", icone: "Bed" },
];

const defaultConfig: Configuracoes = {
  empresa: {
    nome: "MedPlus Hospitalar",
    email: "contato@medplushospitalar.com.br",
    telefone: "(62) 3519-9974",
    whatsapp: "5562994896602",
    endereco:
      "Av. Zoroastro Artiaga, QD 09 LT44 - Cruzeiro do Sul, Aparecida de Goiânia - GO, 74917-196",
    cnpj: "34.075.280/0001-19",
  },
  redesSociais: {
    instagram: "medplushospitalar",
  },
  envios: {
    emailNotificacoes: "contato@medplushospitalar.com.br",
    notifyNewOrder: true,
  },
  frete: {
    cepOrigem: "74917196",
    tokenMelhorEnvio:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2QzNGMxMWZlNmU1OTM0NGM0NTgxNTMwNWQ0MmMyNDUzNGQ1MmU1MThhMzdiNzA0MTkyMDI5YjQ4MGUyNzhlOTE5YzBiNWE5N2EzNjliOTMiLCJpYXQiOjE3Nzg1MTUwOTIuOTEwNDk3LCJuYmYiOjE3Nzg1MTUwOTIuOTEwNDk5LCJleHAiOjE4MTAwNTEwOTIuODk4ODQxLCJzdWIiOiJhMWMxM2Q3Ni0yNDBkLTRiMzItODkzNy0wOWEzYzBmMDlmNjYiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.DzYNvL7an6lXHl_cALAEDpVwfnp1QyrbYKqBJeM68ZySm9bPh6c5TXfyLG0XMU3iw0SAml7sT1iR02EKNw5-WBRa9gqfHNICVP5FtUxV2qCWQH2fyTiBxYhdk7fbmm9WO7ZGMqr3FlKr5TtvoZiq5-Zrkh3CvAVhoyuLHMb6UzkjxJRO9pl-B3Mx6RQwtQlN2u2f8gOdUg6xkKzlFuYDAhm-wKL39791SPrQm8WmXgWCCG7ZoxM2vEYrye8s41SDz2ZTeNtkWnEjjjr2gkqEG6noI7O0oMHc4Ym3O0MneXH0F9_Nt1kI8YKRgpz-9EOicNpkbHwr4CQgjbzHElocS1CL4tb7U02UqtDc0EIeWUbfV0wxhJ7PDL1sB5vMk7ZM4ImUSsTbz4xrtzajGpQbDKGb0CMFIaYCMbWVEQC61PTjoSI48vc73EmE8lbm2izgoKnfpmzi9bIb3CA8Vtd9mYUGlJPc1mAU8jbE233M3GgeTbjnHb7gyQfTqd8tvtE3yjIioYkvQ-o0OJfgORzgyqbJrEOiQJUoPiyreemvW-Pv2ZnphFtEjozHX2Vhxss0fxnUqb2M68vjGscQXVb9xjRWwpFM_iv6uixAH85IgolmKdhNGWAVPWs2LUlE-ItwGqwqvB606OqNopZK4eH4hjWm0LnjmYAOVpmR5dCxMY4",
  },
};

export function useAdminStorage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [config, setConfig] = useState<Configuracoes>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load categorias
      const { data: categoriasData, error: categoriasError } = await supabase
        .from("categorias")
        .select("*")
        .order("nome");

      if (categoriasError) throw categoriasError;

      if (categoriasData && categoriasData.length > 0) {
        setCategorias(
          categoriasData.map((c) => ({
            id: c.id,
            nome: c.nome,
            slug: c.slug,
            icone: c.icone,
          })),
        );
      } else {
        // Insert default categorias
        for (const c of defaultCategorias) {
          await supabase.from("categorias").insert({
            nome: c.nome,
            slug: c.slug,
            icone: c.icone,
          });
        }
        setCategorias(defaultCategorias);
      }

      // Load produtos
      const { data: produtosData, error: produtosError } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });

      if (produtosError) throw produtosError;

      if (produtosData) {
        setProdutos(
          produtosData.map((p) => ({
            id: p.id,
            nome: p.nome,
            descricao: p.descricao,
            preco: Number(p.preco),
            precoOriginal: p.preco_original ? Number(p.preco_original) : undefined,
            imagemPrincipal: p.imagem_principal,
            imagensSecundarias: p.imagens_secundarias || [],
            categoria: p.categoria,
            estoque: p.estoque,
            sku: p.sku,
            dimensoes: p.dimensoes || { altura: 0, largura: 0, comprimento: 0 },
            peso: Number(p.peso) || 0,
            destaque: p.destaque,
            ativo: p.ativo,
            flag_oferta: p.flag_oferta,
            flag_novidade: p.flag_novidade,
            flag_mais_vendido: p.flag_mais_vendido,
            createdAt: p.created_at,
          })),
        );
      }

      // Load config
      const { data: configData } = await supabase
        .from("config")
        .select("dados")
        .eq("id", "empresa")
        .single();

      if (configData?.dados) {
        setConfig({
          ...defaultConfig,
          ...configData.dados,
          frete: { ...defaultConfig.frete, ...(configData.dados.frete || {}) },
          empresa: { ...defaultConfig.empresa, ...(configData.dados.empresa || {}) },
          redesSociais: { ...defaultConfig.redesSociais, ...(configData.dados.redesSociais || {}) },
          envios: { ...defaultConfig.envios, ...(configData.dados.envios || {}) },
        });
      }

      // Load pedidos
      const pedidosData = await carregarPedidosAdmin();
      setPedidos(pedidosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduto = async (produto: Omit<Produto, "id" | "createdAt">) => {
    const { data, error } = await supabase
      .from("produtos")
      .insert({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        preco_original: produto.precoOriginal,
        imagem_principal: produto.imagemPrincipal,
        imagens_secundarias: produto.imagensSecundarias,
        categoria: produto.categoria,
        estoque: produto.estoque,
        sku: produto.sku,
        dimensoes: produto.dimensoes,
        peso: produto.peso,
        destaque: produto.destaque,
        ativo: produto.ativo,
        flag_oferta: produto.flag_oferta,
        flag_novidade: produto.flag_novidade,
        flag_mais_vendido: produto.flag_mais_vendido,
        especificacoes: produto.especificacoes,
      })
      .select()
      .single();

    if (error) throw error;

    await loadData();
    return data;
  };

  const updateProduto = async (id: string, data: Partial<Produto>) => {
    const updateData: Record<string, unknown> = {};

    if (data.nome !== undefined) updateData.nome = data.nome;
    if (data.descricao !== undefined) updateData.descricao = data.descricao;
    if (data.preco !== undefined) updateData.preco = data.preco;
    if (data.precoOriginal !== undefined) updateData.preco_original = data.precoOriginal;
    if (data.imagemPrincipal !== undefined) updateData.imagem_principal = data.imagemPrincipal;
    if (data.imagensSecundarias !== undefined)
      updateData.imagens_secundarias = data.imagensSecundarias;
    if (data.categoria !== undefined) updateData.categoria = data.categoria;
    if (data.estoque !== undefined) updateData.estoque = data.estoque;
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.dimensoes !== undefined) updateData.dimensoes = data.dimensoes;
    if (data.peso !== undefined) updateData.peso = data.peso;
    if (data.destaque !== undefined) updateData.destaque = data.destaque;
    if (data.ativo !== undefined) updateData.ativo = data.ativo;
    if (data.flag_oferta !== undefined) updateData.flag_oferta = data.flag_oferta;
    if (data.flag_novidade !== undefined) updateData.flag_novidade = data.flag_novidade;
    if (data.flag_mais_vendido !== undefined) updateData.flag_mais_vendido = data.flag_mais_vendido;
    if (data.especificacoes !== undefined) updateData.especificacoes = data.especificacoes;

    const { error } = await supabase.from("produtos").update(updateData).eq("id", id);

    if (error) throw error;

    await loadData();
  };

  const deleteProduto = async (id: string) => {
    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) throw error;

    await loadData();
  };

  const addCategoria = async (categoria: Omit<Categoria, "id">) => {
    const { data, error } = await supabase
      .from("categorias")
      .insert({
        nome: categoria.nome,
        slug: categoria.slug,
        icone: categoria.icone,
      })
      .select()
      .single();

    if (error) throw error;

    await loadData();
    return data;
  };

  const updateCategoria = async (id: string, data: Partial<Categoria>) => {
    const updateData: Record<string, unknown> = {};

    if (data.nome !== undefined) updateData.nome = data.nome;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.icone !== undefined) updateData.icone = data.icone;

    const { error } = await supabase.from("categorias").update(updateData).eq("id", id);

    if (error) throw error;

    await loadData();
  };

  const deleteCategoria = async (id: string) => {
    const { error } = await supabase.from("categorias").delete().eq("id", id);

    if (error) throw error;

    await loadData();
  };

  const saveConfig = async (data: Configuracoes) => {
    const { error } = await supabase
      .from("config")
      .upsert({ id: "empresa", dados: data }, { onConflict: "id" });

    if (error) throw error;

    setConfig(data);
  };

  const saveProdutos = async (data: Produto[]) => {
    await loadData();
  };

  const updatePedidoStatus = async (id: string, status: Pedido["status"]) => {
    await atualizarStatusPedido(id, status);
    await loadData();
  };

  return {
    produtos,
    categorias,
    pedidos,
    config,
    loading,
    addProduto,
    updateProduto,
    deleteProduto,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    saveConfig,
    saveProdutos,
    updatePedidoStatus,
    refresh: loadData,
  };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEYS.auth);
    setIsAuthenticated(auth === "true");
  }, []);

  const login = (password: string) => {
    if (password === "medplus2026") {
      localStorage.setItem(STORAGE_KEYS.auth, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
