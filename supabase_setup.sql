-- =====================================================
-- ARK IT 사이트 - Supabase 초기 설정 SQL
-- Supabase 대시보드 > SQL Editor 에서 실행하세요
-- =====================================================

-- ① profiles 테이블 (auth.users 와 1:1 연결)
create table if not exists public.profiles (
  id        uuid references auth.users on delete cascade primary key,
  username  text,
  is_admin  boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles: 누구나 조회 가능" on public.profiles
  for select using (true);

create policy "profiles: 본인만 수정 가능" on public.profiles
  for update using (auth.uid() = id);

-- 신규 가입 시 profiles 자동 생성 트리거
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ② notices 테이블 (공지사항 - 관리자만 작성)
create table if not exists public.notices (
  id         bigserial primary key,
  title      text not null,
  content    text not null,
  author_id  uuid references auth.users on delete cascade,
  is_pinned  boolean default false,
  views      integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.notices enable row level security;

create policy "notices: 누구나 조회 가능" on public.notices
  for select using (true);

create policy "notices: 관리자만 등록 가능" on public.notices
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "notices: 관리자만 수정 가능" on public.notices
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "notices: 관리자만 삭제 가능" on public.notices
  for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );


-- ③ posts 테이블 (자유게시판 - 로그인 사용자 작성)
create table if not exists public.posts (
  id         bigserial primary key,
  title      text not null,
  content    text not null,
  author_id  uuid references auth.users on delete cascade,
  views      integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.posts enable row level security;

create policy "posts: 누구나 조회 가능" on public.posts
  for select using (true);

create policy "posts: 로그인 사용자 등록 가능" on public.posts
  for insert with check (auth.role() = 'authenticated');

create policy "posts: 본인 또는 관리자만 수정 가능" on public.posts
  for update using (
    auth.uid() = author_id or
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "posts: 본인 또는 관리자만 삭제 가능" on public.posts
  for delete using (
    auth.uid() = author_id or
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );


-- ④ qna 테이블 (Q&A - 로그인 사용자 작성, 관리자 답변)
create table if not exists public.qna (
  id           bigserial primary key,
  title        text not null,
  content      text not null,
  author_id    uuid references auth.users on delete cascade,
  is_private   boolean default false,
  answer       text,
  answered_by  uuid references auth.users,
  answered_at  timestamp with time zone,
  views        integer default 0,
  created_at   timestamp with time zone default now(),
  updated_at   timestamp with time zone default now()
);

alter table public.qna enable row level security;

create policy "qna: 공개 글은 누구나, 비공개는 본인/관리자만 조회" on public.qna
  for select using (
    is_private = false
    or auth.uid() = author_id
    or exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "qna: 로그인 사용자 등록 가능" on public.qna
  for insert with check (auth.role() = 'authenticated');

create policy "qna: 본인 또는 관리자만 수정 가능" on public.qna
  for update using (
    auth.uid() = author_id or
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "qna: 본인 또는 관리자만 삭제 가능" on public.qna
  for delete using (
    auth.uid() = author_id or
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );


-- ⑤ 조회수 증가 함수 (RLS 우회용 security definer)
create or replace function public.increment_post_views(p_table text, p_id bigint)
returns void language plpgsql security definer as $$
begin
  if p_table = 'notices' then
    update public.notices set views = views + 1 where id = p_id;
  elsif p_table = 'posts' then
    update public.posts set views = views + 1 where id = p_id;
  elsif p_table = 'qna' then
    update public.qna set views = views + 1 where id = p_id;
  end if;
end;
$$;


-- ⑥ 첫 번째 관리자 계정 설정 (회원가입 후 이메일로 검색해서 실행)
-- 아래 이메일을 실제 관리자 이메일로 변경 후 실행하세요:
-- update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'your-admin@email.com');
