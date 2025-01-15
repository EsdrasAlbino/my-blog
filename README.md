# Project Structure

## Root Directory
- `.env`
- `.env.local`
- `.gitignore`
- `package.json`
- `README.md`
- `tsconfig.json`

## Directories
- `.next/`
  - `app-build-manifest.json`
  - `build-manifest.json`
  - `cache/`
  - `diagnostics/`
  - `fallback-build-manifest.json`
  - `package.json`
  - `react-loadable-manifest.json`
  - `server/`
  - `static/`
  - `trace`
  - `types/`

- `app/`
  - `(auth)/`
    - `login/page.tsx`
    - `register/page.tsx`
  - `(protected)/`
    - `blog/`
      - `create/page.tsx`
      - `[slug]/`
        - `page.tsx`
        - `edit/page.tsx`
  - `api/`
    - `auth/[...nextauth]/route.ts`
    - `posts/`
      - `[slug]/route.ts`
      - `route.ts`
    - `users/route.ts`
  - `globals.css`
  - `layout.tsx`
  - `page.module.css`
  - `page.tsx`
  - `StyledRoot.tsx`

- `components/`
  - `AppBar.tsx`
  - `AuthProvider.tsx`
  - `Footer.tsx`
  - `LoginComponent.tsx`
  - `RegisterComponent.tsx`
  - `complexUI/`
    - `author/Author.tsx`
    - `copyright/Copyright.tsx`
    - `formsPost/FormsPost.tsx`
    - `postCard/PostCard.tsx`
    - `search/Search.tsx`
    - `singlePost/SinglePost.tsx`
  - `template/`
    - `BlogComponent.tsx`
    - `FormsComponent.tsx`

- `hooks/`

- `lib/`
  - `auth.ts`
  - `data.ts`
  - `designSystem.ts`
  - `prismaClient.ts`
  - `session.ts`
  - `translate.ts`
  - `types.ts`
  - `utils.ts`

- `prisma/`
  - `schema.prisma`

- `public/`

## Configuration Files
- `eslint.config.mjs`
- `next.config.ts`
- `next-env.d.ts`