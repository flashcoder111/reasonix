create extension if not exists pgcrypto;

create table if not exists public.community_questions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  locale text not null check (locale in ('en', 'zh-cn', 'zh-tw', 'ru')),
  title text not null check (char_length(title) between 8 and 160),
  body text not null check (char_length(body) between 20 and 5000),
  author_clerk_id text not null,
  author_name text not null,
  author_image_url text,
  status text not null default 'visible' check (status in ('visible', 'hidden', 'deleted')),
  reply_count integer not null default 0 check (reply_count >= 0),
  last_reply_at timestamptz,
  hidden_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_replies (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.community_questions(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  author_clerk_id text not null,
  author_name text not null,
  author_image_url text,
  status text not null default 'visible' check (status in ('visible', 'hidden', 'deleted')),
  hidden_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_questions_status_locale_created_idx
  on public.community_questions (status, locale, created_at desc);

create index if not exists community_questions_status_last_reply_idx
  on public.community_questions (status, last_reply_at desc nulls last, created_at desc);

create index if not exists community_questions_title_search_idx
  on public.community_questions using gin (to_tsvector('simple', title || ' ' || body));

create index if not exists community_replies_question_status_created_idx
  on public.community_replies (question_id, status, created_at asc);

create or replace function public.set_community_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_community_questions_updated_at on public.community_questions;
create trigger set_community_questions_updated_at
  before update on public.community_questions
  for each row
  execute function public.set_community_updated_at();

drop trigger if exists set_community_replies_updated_at on public.community_replies;
create trigger set_community_replies_updated_at
  before update on public.community_replies
  for each row
  execute function public.set_community_updated_at();

create or replace function public.refresh_community_question_reply_count()
returns trigger
language plpgsql
as $$
declare
  target_question_id uuid;
begin
  if tg_op = 'DELETE' then
    target_question_id := old.question_id;
  else
    target_question_id := new.question_id;
  end if;

  update public.community_questions
  set
    reply_count = (
      select count(*)::integer
      from public.community_replies
      where question_id = target_question_id
        and status = 'visible'
    ),
    last_reply_at = (
      select max(created_at)
      from public.community_replies
      where question_id = target_question_id
        and status = 'visible'
    )
  where id = target_question_id;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

drop trigger if exists refresh_community_question_reply_count_on_insert on public.community_replies;
create trigger refresh_community_question_reply_count_on_insert
  after insert on public.community_replies
  for each row
  execute function public.refresh_community_question_reply_count();

drop trigger if exists refresh_community_question_reply_count_on_update on public.community_replies;
create trigger refresh_community_question_reply_count_on_update
  after update of status, question_id on public.community_replies
  for each row
  execute function public.refresh_community_question_reply_count();

drop trigger if exists refresh_community_question_reply_count_on_delete on public.community_replies;
create trigger refresh_community_question_reply_count_on_delete
  after delete on public.community_replies
  for each row
  execute function public.refresh_community_question_reply_count();

alter table public.community_questions enable row level security;
alter table public.community_replies enable row level security;

revoke all on table public.community_questions from anon, authenticated;
revoke all on table public.community_replies from anon, authenticated;
grant select, insert, update, delete on table public.community_questions to service_role;
grant select, insert, update, delete on table public.community_replies to service_role;
revoke execute on function public.set_community_updated_at() from public, anon, authenticated;
revoke execute on function public.refresh_community_question_reply_count() from public, anon, authenticated;
grant execute on function public.set_community_updated_at() to service_role;
grant execute on function public.refresh_community_question_reply_count() to service_role;
