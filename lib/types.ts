export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  preco_promocional?: number | null;
  categoria: string;
  tamanhos: string[];
  imagens: string[];
  slug: string;
  estoque: number;
  ativo: boolean;
  created_at: string;
};

export type PedidoItem = {
  produto_id: string;
  nome: string;
  preco: number;
  tamanho?: string;
  quantidade: number;
  imagem: string;
};

export type Pedido = {
  id: string;
  status: "pending" | "approved" | "cancelled" | "in_process";
  total: number;
  itens: PedidoItem[];
  cliente_nome: string;
  cliente_email: string;
  cliente_telefone: string;
  pagamento_id?: string;
  created_at: string;
};
