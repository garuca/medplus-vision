export type DataSource = "local" | "supabase";

export function useDataSource() {
  return {
    source: "supabase" as DataSource,
    setDataSource: (_newSource: DataSource) => {},
    isLocal: false,
    isSupabase: true,
  };
}

export function getDataSourceFromUrl(): DataSource {
  return "supabase";
}
