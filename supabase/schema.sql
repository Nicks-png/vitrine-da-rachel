-- Tabela de produtos
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text not null default '',
  preco numeric(10,2) not null,
  preco_promocional numeric(10,2),
  categoria text not null,
  tamanhos text[] not null default '{}',
  imagens text[] not null default '{}',
  slug text unique not null,
  estoque int not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- Tabela de pedidos
create table if not exists public.pedidos (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending',
  total numeric(10,2) not null,
  itens jsonb not null default '[]',
  cliente_nome text not null,
  cliente_email text not null,
  cliente_telefone text not null,
  pagamento_id text,
  created_at timestamptz not null default now()
);

-- RLS: produtos são públicos para leitura
alter table public.produtos enable row level security;

create policy "Produtos visíveis publicamente"
  on public.produtos for select
  using (ativo = true);

create policy "Admin pode tudo em produtos"
  on public.produtos for all
  using (auth.role() = 'authenticated');

-- RLS: pedidos somente para admins
alter table public.pedidos enable row level security;

create policy "Admin pode ler pedidos"
  on public.pedidos for select
  using (auth.role() = 'authenticated');

create policy "Inserção de pedidos via service role"
  on public.pedidos for insert
  with check (true);

create policy "Atualização de pedidos via service role"
  on public.pedidos for update
  using (true);

-- Storage bucket para imagens
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

create policy "Imagens públicas"
  on storage.objects for select
  using (bucket_id = 'produtos');

create policy "Admin pode fazer upload"
  on storage.objects for insert
  with check (bucket_id = 'produtos' and auth.role() = 'authenticated');

create policy "Admin pode deletar imagens"
  on storage.objects for delete
  using (bucket_id = 'produtos' and auth.role() = 'authenticated');
