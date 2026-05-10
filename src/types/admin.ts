export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  imagemPrincipal: string;
  imagensSecundarias: string[];
  categoria: string;
  estoque: number;
  sku: string;
  dimensoes: {
    altura: number;
    largura: number;
    comprimento: number;
  };
  peso: number;
  destaque?: boolean;
  ativo?: boolean;
  flag_oferta?: boolean;
  flag_novidade?: boolean;
  flag_mais_vendido?: boolean;
  especificacoes?: string;
  createdAt: string;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  icone?: string;
}

export interface Pedido {
  id: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  produtos: {
    produtoId: string;
    nome: string;
    quantidade: number;
    preco: number;
  }[];
  total: number;
  status: "pendente" | "processando" | "enviado" | "entregue" | "cancelado";
  formaPagamento: "whatsapp" | "mercadopago" | "pix" | "boleto";
  createdAt: string;
}

export interface Configuracoes {
  empresa: {
    nome: string;
    email: string;
    telefone: string;
    whatsapp: string;
    endereco: string;
    cnpj: string;
  };
  redesSociais: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  envios: {
    emailNotificacoes: string;
    notifyNewOrder: boolean;
  };
}
