import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export type DataSource = "local" | "supabase";

const DEFAULT_SOURCE: DataSource = "local";

export function useDataSource() {
  const [location] = useLocation();
  const [source, setSource] = useState<DataSource>(DEFAULT_SOURCE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get("source");
    
    if (urlSource === "supabase" || urlSource === "local") {
      setSource(urlSource);
    } else {
      setSource(DEFAULT_SOURCE);
    }
  }, [location]);

  const setDataSource = (newSource: DataSource) => {
    const params = new URLSearchParams(window.location.search);
    if (newSource === DEFAULT_SOURCE) {
      params.delete("source");
    } else {
      params.set("source", newSource);
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
    window.history.pushState({}, "", newUrl);
    setSource(newSource);
  };

  return {
    source,
    setDataSource,
    isLocal: source === "local",
    isSupabase: source === "supabase",
  };
}

export function getDataSourceFromUrl(): DataSource {
  if (typeof window === "undefined") return DEFAULT_SOURCE;
  
  const params = new URLSearchParams(window.location.search);
  const urlSource = params.get("source");
  
  if (urlSource === "supabase" || urlSource === "local") {
    return urlSource;
  }
  
  return DEFAULT_SOURCE;
}