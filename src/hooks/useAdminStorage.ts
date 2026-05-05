import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
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
    whatsapp: "556294896602",
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
        setConfig(configData.dados);
      }
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
    // For bulk operations
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
