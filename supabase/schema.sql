-- ============================================================
-- DUCANI Marketplace — Schema
-- Запусти этот скрипт в Supabase → SQL Editor
-- ============================================================

-- Профили пользователей (расширяет auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Автоматически создавать профиль при регистрации
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Заказы
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  status text default 'pending' check (status in ('pending','paid','shipped','delivered','cancelled')),
  total_price bigint not null,
  customer_name text,
  customer_phone text,
  customer_address text,
  payment_method text check (payment_method in ('payme','click','cash')),
  payment_id text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Позиции заказа
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id text not null,
  product_name text not null,
  product_image text,
  size text not null,
  price bigint not null,
  quantity int default 1
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Политики для profiles
create policy "Пользователь видит свой профиль"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Пользователь обновляет свой профиль"
  on public.profiles for update
  using (auth.uid() = id);

-- Политики для orders
create policy "Пользователь видит свои заказы"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Пользователь создаёт заказы"
  on public.orders for insert
  with check (true);

create policy "Пользователь видит позиции своих заказов"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Создание позиций заказа"
  on public.order_items for insert
  with check (true);
