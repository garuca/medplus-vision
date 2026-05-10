import { supabase } from "./supabase";
import type { Pedido } from "../types/admin";

export async function salvarPedido(data: {
  user_id?: string;
  cliente: Pedido["cliente"];
  endereco: Pedido["endereco"];
  produtos: Pedido["produtos"];
  total: number;
  formaPagamento: Pedido["formaPagamento"];
  pagamentoStatus?: Pedido["pagamentoStatus"];
}): Promise<Pedido> {
  const codigo = "MED" + Date.now().toString().slice(-8);

  const { data: pedido, error } = await supabase
    .from("pedidos")
    .insert({
      codigo,
      user_id: data.user_id || null,
      cliente: data.cliente,
      endereco: data.endereco,
      produtos: data.produtos,
      total: data.total,
      forma_pagamento: data.formaPagamento,
      pagamento_status: data.pagamentoStatus || "aguardando",
      status: "pendente",
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: pedido.id,
    codigo: pedido.codigo,
    user_id: pedido.user_id,
    cliente: pedido.cliente,
    endereco: pedido.endereco,
    produtos: pedido.produtos,
    total: pedido.total,
    status: pedido.status,
    formaPagamento: pedido.forma_pagamento,
    pagamentoStatus: pedido.pagamento_status,
    pagamentoId: pedido.pagamento_id,
    createdAt: pedido.created_at,
  };
}

export async function atualizarPagamentoPedido(
  pedidoId: string,
  pagamentoStatus: Pedido["pagamentoStatus"],
  pagamentoId?: string,
) {
  const updateData: Record<string, unknown> = {
    pagamento_status: pagamentoStatus,
  };
  if (pagamentoId) updateData.pagamento_id = pagamentoId;
  if (pagamentoStatus === "aprovado") updateData.status = "processando";

  const { error } = await supabase.from("pedidos").update(updateData).eq("id", pedidoId);
  if (error) throw error;
}

export async function carregarPedidosAdmin(): Promise<Pedido[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map(formatarPedido);
}

export async function carregarPedidosUsuario(userId: string): Promise<Pedido[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map(formatarPedido);
}

export async function carregarPedidoPorId(id: string): Promise<Pedido | null> {
  const { data, error } = await supabase.from("pedidos").select("*").eq("id", id).single();
  if (error) return null;
  return data ? formatarPedido(data) : null;
}

export async function atualizarStatusPedido(id: string, status: Pedido["status"]) {
  const { error } = await supabase.from("pedidos").update({ status }).eq("id", id);
  if (error) throw error;
}

function formatarPedido(p: Record<string, unknown>): Pedido {
  return {
    id: p.id as string,
    codigo: p.codigo as string,
    user_id: p.user_id as string | undefined,
    cliente: p.cliente as Pedido["cliente"],
    endereco: p.endereco as Pedido["endereco"],
    produtos: p.produtos as Pedido["produtos"],
    total: Number(p.total),
    status: p.status as Pedido["status"],
    formaPagamento: p.forma_pagamento as Pedido["formaPagamento"],
    pagamentoStatus: p.pagamento_status as Pedido["pagamentoStatus"],
    pagamentoId: p.pagamento_id as string | undefined,
    createdAt: p.created_at as string,
  };
}
