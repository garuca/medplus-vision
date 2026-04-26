import { useDataSource } from "../hooks/useDataSource";
import { Database, Cloud } from "lucide-react";

export function DataSourceIndicator() {
  const { source, isLocal, isSupabase, setDataSource } = useDataSource();

  if (isLocal) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setDataSource("supabase")}
          className="flex items-center gap-2 px-3 py-2 bg-amber-500/90 hover:bg-amber-500 text-white rounded-lg text-sm font-medium shadow-lg backdrop-blur"
          title="Clique para usar dados do Supabase"
        >
          <Database className="h-4 w-4" />
          <span>Dados Locais</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <button
        onClick={() => setDataSource("local")}
        className="flex items-center gap-2 px-3 py-2 bg-green-500/90 hover:bg-green-500 text-white rounded-lg text-sm font-medium shadow-lg backdrop-blur"
        title="Clique para usar dados locais"
      >
        <Cloud className="h-4 w-4" />
        <span>Supabase</span>
      </button>
    </div>
  );
}

export function DataSourceToggle() {
  const { source, isLocal, isSupabase } = useDataSource();

  if (isLocal) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">
        <Database className="h-3 w-3" />
        Locais
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
      <Cloud className="h-3 w-3" />
      Supabase
    </span>
  );
}