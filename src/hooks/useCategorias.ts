import { useState, useEffect } from "react";
import { useDataSource } from "./useDataSource";
import { supabase } from "../lib/supabase";

interface Categoria {
  id: string;
  nome: string;
  slug: string;
  icone?: string;
}

export function useCategorias() {
  const { source, isLocal, isSupabase } = useDataSource();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategorias();
  }, [source]);

  const loadCategorias = async () => {
    setLoading(true);
    setError(null);

    try {
      if (source === "supabase") {
        const { data, error } = await supabase
          .from("categorias")
          .select("*")
          .order("nome");

        if (error) throw error;

        const formatadas = (data || []).map((c) => ({
          id: c.id,
          nome: c.nome,
          slug: c.slug,
          icone: c.icone,
        }));

        setCategorias(formatadas);
      } else {
        // Categorias locais (hardcoded)
        setCategorias([
          { id: "1", nome: "Descartáveis", slug: "descartaveis", icone: "Gloves" },
          { id: "2", nome: "Equipamentos", slug: "equipamentos", icone: "Stethoscope" },
          { id: "3", nome: "EPIs", slug: "epis", icone: "Shield" },
          { id: "4", nome: "Curativos", slug: "curativos", icone: "Bandage" },
          { id: "5", nome: "Medicamentos", slug: "medicamentos", icone: "Pill" },
          { id: "6", nome: "Mobiliário", slug: "mobiliario", icone: "Bed" },
        ]);
      }
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
      setError("Erro ao carregar categorias");
      // Fallback local
      setCategorias([
        { id: "1", nome: "Descartáveis", slug: "descartaveis", icone: "Gloves" },
        { id: "2", nome: "Equipamentos", slug: "equipamentos", icone: "Stethoscope" },
        { id: "3", nome: "EPIs", slug: "epis", icone: "Shield" },
        { id: "4", nome: "Curativos", slug: "curativos", icone: "Bandage" },
        { id: "5", nome: "Medicamentos", slug: "medicamentos", icone: "Pill" },
        { id: "6", nome: "Mobiliário", slug: "mobiliario", icone: "Bed" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    categorias,
    loading,
    error,
    source,
    isLocal,
    isSupabase,
    refresh: loadCategorias,
  };
}