# CDQS Persistent Storage Setup

This upgrade keeps the no-LMS CDQS structure and moves applications, CRM reads, certificate records, and verification to Supabase.

It also connects the sales funnel to the credentialing backend:

```text
/cdqs/dashboard
  -> Accept + create profile
  -> /registry/portal/?token=...
  -> /registry/evidence/?token=...
  -> /registry/admin
  -> /registry/certificates?token=...
  -> /registry/verify?token=...
  -> /registry/profile?token=...
```

## 1. Create Supabase Tables and RPC Functions

Open Supabase SQL Editor and run:

```text
supabase/cdqs_persistent_storage.sql
```

Before running it, replace:

```text
CHANGE-ME-CDQS-ADMIN-PIN
```

with the admin PIN you want to use for the CRM dashboard and certificate generator.

## 2. Add Environment Variables

Set these in local/deployment environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

The app does not use a service-role key in browser code.

## 3. Build

Because this site uses static export:

```powershell
C:\Users\Thres\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe node_modules\next\dist\bin\next build
```

## 4. Security Notes

- Applications can be inserted publicly.
- Applications cannot be read directly through table SELECT policies.
- CRM reads require the `cdqs_admin_list_applications` RPC and the admin PIN.
- Certificate creation requires the `cdqs_admin_create_certificate` RPC and the admin PIN.
- Verification uses a public token lookup through `cdqs_verify_certificate`.
- Registry profile creation requires `cdqs_admin_accept_application` and the admin PIN.
- Student evidence submission requires the generated profile token.
- Registry admin review requires the admin PIN.
- If your Supabase Data API settings do not expose new tables/functions automatically, expose the relevant objects in the Supabase dashboard.
