-- ============================================================
-- DUCANI — Таблица товаров
-- Запусти в Supabase → SQL Editor
-- ============================================================

create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  category text default 'Кроссовки',
  price bigint not null,
  original_price bigint,
  image text not null,
  colorway text,
  sku text,
  year int,
  verified boolean default true,
  badge text check (badge in ('NEW','TRENDING','SALE','RARE') or badge is null),
  description text,
  in_stock boolean default true,
  sizes jsonb default '[]',
  created_at timestamptz default now()
);

-- Публичный доступ (все могут читать товары)
alter table public.products enable row level security;

create policy "Товары видны всем"
  on public.products for select
  using (true);

create policy "Только админ добавляет товары"
  on public.products for insert
  using (auth.jwt() ->> 'email' = 'justjakhonbek@gmail.com');

create policy "Только админ редактирует товары"
  on public.products for update
  using (auth.jwt() ->> 'email' = 'justjakhonbek@gmail.com');

-- Вставить начальные товары
insert into public.products (name, brand, price, original_price, image, colorway, sku, year, verified, badge, description, sizes) values
(
  'Air Jordan 1 Retro High OG',
  'Jordan',
  2200000,
  2800000,
  '/products/jordan1-chicago.jpg',
  'Chicago / Red White Black',
  'DKN-555088-101',
  2023,
  true,
  'TRENDING',
  'Air Jordan 1 Retro High OG "Chicago" — классика уличной культуры. Оригинальная цветовая гамма 1985 года.',
  '[{"size":"38","available":true},{"size":"39","available":true},{"size":"40","available":false},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":true},{"size":"44","available":false},{"size":"45","available":true}]'
),
(
  'Nike Dunk Low',
  'Nike',
  1900000,
  null,
  '/products/dunk-panda.jpg',
  'Panda / White Black',
  'DKN-DD1391-100',
  2023,
  true,
  'NEW',
  'Nike Dunk Low "Panda" — самая популярная модель последних лет.',
  '[{"size":"38","available":true},{"size":"39","available":true},{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":false},{"size":"44","available":true},{"size":"45","available":true}]'
),
(
  'Nike Air Force 1 Low',
  'Nike',
  1400000,
  null,
  '/products/af1-white.jpg',
  'Triple White',
  'DKN-315122-111',
  2024,
  true,
  null,
  'Nike Air Force 1 Low — легендарная модель с 1982 года.',
  '[{"size":"38","available":true},{"size":"39","available":false},{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":true},{"size":"44","available":true},{"size":"45","available":false}]'
),
(
  'Yeezy Boost 350 V2',
  'Adidas',
  2800000,
  3200000,
  '/products/yeezy-zebra.jpg',
  'Zebra / White Black Red',
  'DKN-CP9654',
  2022,
  true,
  'RARE',
  'Adidas Yeezy Boost 350 V2 "Zebra" — одна из самых желанных пар в коллекции.',
  '[{"size":"39","available":true},{"size":"40","available":true},{"size":"41","available":false},{"size":"42","available":true},{"size":"43","available":true},{"size":"44","available":true}]'
),
(
  'New Balance 550',
  'New Balance',
  1600000,
  null,
  '/products/nb550-green.jpg',
  'Green / White',
  'DKN-BB550WT1',
  2023,
  true,
  'NEW',
  'New Balance 550 — ретро-баскетбольная модель переживает второе рождение.',
  '[{"size":"38","available":true},{"size":"39","available":true},{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":false},{"size":"43","available":true},{"size":"44","available":true}]'
),
(
  'Adidas Samba OG',
  'Adidas',
  1450000,
  null,
  '/products/samba-white.jpg',
  'White / Black Gum',
  'DKN-B75806',
  2024,
  true,
  'TRENDING',
  'Adidas Samba OG — культовая модель 1950-х снова на пике популярности.',
  '[{"size":"38","available":true},{"size":"39","available":true},{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":true},{"size":"44","available":false}]'
),
(
  'Travis Scott x Air Jordan 1 Low',
  'Jordan',
  11000000,
  null,
  '/products/ts-jordan-low.jpg',
  'Mocha / Olive',
  'DKN-553558-201',
  2019,
  true,
  'RARE',
  'Travis Scott x Air Jordan 1 Low OG — коллаборация которую все хотят. Обратный Swoosh, коричневые тона.',
  '[{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":false}]'
),
(
  'Jordan 4 Military Blue',
  'Jordan',
  3500000,
  null,
  '/products/jordan4-military.jpg',
  'Military Blue / White',
  'DKN-308497-105',
  2024,
  true,
  'NEW',
  'Air Jordan 4 Retro "Military Blue" — переиздание легендарной пары 1989 года.',
  '[{"size":"39","available":true},{"size":"40","available":true},{"size":"41","available":true},{"size":"42","available":true},{"size":"43","available":true},{"size":"44","available":true}]'
);
