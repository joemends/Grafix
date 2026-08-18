-- CLIENT PROFILE + THEME / FEATURE SETTINGS
-- Run after your existing portfolio/company schema.

alter table public.clients add column if not exists avatar_path text;
alter table public.clients add column if not exists avatar_url text default '';

-- Admins can already manage clients. Clients can update only their own profile.
drop policy if exists "client update own profile" on public.clients;
create policy "client update own profile" on public.clients
for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Allow a logged-in client to upload only inside their own avatar folder.
drop policy if exists "client upload own avatar" on storage.objects;
create policy "client upload own avatar" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'client-avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "client update own avatar" on storage.objects;
create policy "client update own avatar" on storage.objects
for update to authenticated
using (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'client-avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'client-avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "client delete own avatar" on storage.objects;
create policy "client delete own avatar" on storage.objects
for delete to authenticated
using (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'client-avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);

-- Public theme/content/feature settings are already stored in site_settings.value JSONB.
-- The admin Theme & Features screen writes:
-- value.theme, value.content and value.features.
