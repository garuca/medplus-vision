import { supabase, supabaseStorageUrl } from "../lib/supabase";

// Upload imagem para Supabase Storage
export async function uploadImage(file: File, folder: string = ""): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from("produtos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  
  return `${supabaseStorageUrl}${data.path}`;
}

// Upload múltiplas imagens
export async function uploadImages(files: File[], folder: string = ""): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}

// Deletar imagem do Storage
export async function deleteImage(url: string): Promise<void> {
  if (!url || !url.includes("produtos/")) return;
  
  // Extrair path da URL
  const path = url.split("/storage/v1/object/public/produtos/")[1];
  if (!path) return;
  
  const { error } = await supabase.storage
    .from("produtos")
    .remove([path]);

  if (error) throw error;
}

// Converter File para base64 (fallback)
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Verificar se é URL ou base64
export function isBase64(str: string): boolean {
  return str.startsWith("data:image");
}

// Obter URL pública da imagem
export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${supabaseStorageUrl}${path}`;
}