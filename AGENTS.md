<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ziiz

A design system in two deliverables: `@ziiz/theme`, an npm package holding
the design layer as CSS (ramp, type roles, materials, prose) plus `cn` and
a Shiki theme, and a shadcn registry of components served straight from
this repository. `apps/www` is the docs site that dogfoods both.

```
packages/theme        @ziiz/theme: theme.css, shadcn.css, src/cn.ts, src/shiki.ts
apps/www/components   ui/ (published), docs/ (published primitives), examples/, mdx/
apps/www/content      docs/ (foundation pages, components/<name>.mdx), blog/
apps/www/scripts      build-registry.ts, check-docs.ts
apps/www/public/r     the built registry, committed
.agents/skills        migrate-component (maintainers), ziiz (consumers, also published)
```

## Commands

```bash
pnpm dev                          # builds the theme, then apps/www on :3000
pnpm build                        # theme, registry, then next build
pnpm typecheck && pnpm lint
pnpm docs:check                   # frontmatter, sidebar coverage, internal links
pnpm --filter www registry:build  # after touching ui, docs primitives, hooks, skills or component pages
```

## Rules

- Generated, never edited by hand: `apps/www/registry.json`,
  `apps/www/public/r/`, `apps/www/components/examples/index.ts`,
  `apps/www/lib/component-nav.ts`. Rerun the registry build and commit the
  output; CI fails on stale output.
- `pnpm format` rewrites the whole repo. Format only the paths you touched
  with `pnpm exec prettier --write <paths>`. CI runs `pnpm format:check`.
- No `: ` inside an unquoted YAML frontmatter value; it breaks the MDX build.
- `.notes/` is local scratch, ignored by git.
- Components under `components/ui` speak only ramp vocabulary. The
  `migrate-component` skill holds the decisions in force and the procedure;
  the `ziiz` skill is the consumer-facing summary and is what
  `npx shadcn@latest add @ziiz/skill` installs elsewhere.
- Components never update in a consumer once installed, so a change to a
  published file is a change to what new installs get, nothing more. The
  theme package is versioned; bump it and its CHANGELOG together.
