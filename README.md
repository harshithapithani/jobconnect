# Workspace guidance

- This project uses Next.js App Router, React, TypeScript, Tailwind CSS 4, and Supabase.
- Keep UI work responsive and accessible; preserve the existing demo experience when credentials are not configured.
- Put shared types and demo records in `src/lib/`; do not put Supabase service-role credentials in client code.
- Keep database access aligned with the row-level security policies in `supabase/schema.sql`.
- Run `npm run typecheck` and `npm run lint` after changes. See `README.md` for local setup and Supabase configuration.
