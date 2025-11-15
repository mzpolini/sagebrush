# Neon + Drizzle ORM Setup Template

A generalized, production-ready pattern for setting up **Neon** (serverless PostgreSQL) with **Drizzle ORM** in modern TypeScript projects. Optimized for Next.js App Router, Vercel Edge Runtime, and serverless environments.

---

## Why This Stack?

- **Neon**: Serverless PostgreSQL with generous free tier, autoscaling, and branching
- **Drizzle ORM**: Type-safe, lightweight, SQL-like API with excellent TypeScript support
- **Edge-Compatible**: Works seamlessly with Vercel Edge Runtime and serverless functions
- **Developer Experience**: Type inference, migration tools, and visual database browser

---

## Quick Start

### 1. Install Dependencies

```bash
# Production dependencies
pnpm add drizzle-orm @neondatabase/serverless dotenv

# Development dependencies
pnpm add -D drizzle-kit tsx
```

### 2. Set Up Environment Variables

Create `.env.local` (Next.js) or `.env` (other projects):

```env
DATABASE_URL=postgresql://user:password@your-neon-hostname.neon.tech/dbname?sslmode=require
```

### 3. Create File Structure

```
src/db/
├── index.ts         # Database client
└── schema.ts        # Schema definitions

drizzle/
└── migrations/      # Auto-generated (created by drizzle-kit)

drizzle.config.ts    # Drizzle Kit configuration
```

### 4. Add Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 5. Initialize Database

```bash
pnpm db:push  # Quick push for development
# OR
pnpm db:generate && pnpm db:migrate  # For tracked migrations
```

---

## Core Files

### `drizzle.config.ts` - Drizzle Kit Configuration

```typescript
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from .env.local (Next.js convention)
// Use .env for non-Next.js projects
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,  // Detailed output during migrations
  strict: true,   // Safer schema changes
});
```

**Key Configurations:**
- `schema`: Path to your schema file(s)
- `out`: Where migration files are generated
- `dialect`: Database type (postgresql, mysql, sqlite)
- `verbose`: Enable detailed migration output
- `strict`: Prevent potentially unsafe schema changes

---

### `src/db/index.ts` - Database Client

```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Validate environment variable at module load time
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string');
}

// Create Neon HTTP client (optimized for serverless)
const sql = neon(process.env.DATABASE_URL);

// Export database instance with schema for type-safe queries
export const db = drizzle(sql, { schema });
```

**Why This Pattern:**
- Singleton database instance (reused across imports)
- Early validation of environment variables
- Schema passed to drizzle for type inference in queries
- Uses Neon's HTTP driver (Edge Runtime compatible)

---

### `src/db/schema.ts` - Schema Definitions

Basic starter schema with common patterns:

```typescript
import { pgTable, text, timestamp, uuid, pgEnum, jsonb, boolean } from 'drizzle-orm/pg-core';

// Example: Enum for user roles
export const roleEnum = pgEnum('role', ['admin', 'user', 'guest']);

// Example: Posts table demonstrating common patterns
export const posts = pgTable('posts', {
  // UUID primary key with auto-generation
  id: uuid('id').defaultRandom().primaryKey(),

  // Basic fields
  title: text('title').notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),

  // Enum field
  authorRole: roleEnum('author_role').default('user').notNull(),

  // Foreign key example (references users table)
  // authorId: uuid('author_id')
  //   .notNull()
  //   .references(() => users.id, { onDelete: 'cascade' }),

  // JSONB for flexible metadata
  metadata: jsonb('metadata'),

  // Auto-managed timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (table) => ({
  // Indexes for query performance
  // titleIdx: { columns: [table.title] },
}));

// Type exports for TypeScript
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// Optional: TypeScript interfaces for JSONB structure
export interface PostMetadata {
  tags?: string[];
  featured?: boolean;
  viewCount?: number;
}
```

---

## Common Schema Patterns

### UUID Primary Keys

```typescript
id: uuid('id').defaultRandom().primaryKey()
```

**Why:** Better for distributed systems, harder to guess, globally unique

---

### Auto-Managed Timestamps

```typescript
createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
updatedAt: timestamp('updated_at', { mode: 'date' })
  .defaultNow()
  .$onUpdate(() => new Date())
  .notNull()
```

**Pattern:** `createdAt` set once, `updatedAt` auto-updates on every change

---

### Foreign Keys with Cascade

```typescript
userId: uuid('user_id')
  .notNull()
  .references(() => users.id, { onDelete: 'cascade' })
```

**Options:**
- `cascade`: Delete related records when parent is deleted
- `set null`: Set to null when parent is deleted
- `restrict`: Prevent deletion if related records exist

---

### PostgreSQL Enums

```typescript
export const statusEnum = pgEnum('status', ['draft', 'published', 'archived']);

// In table definition:
status: statusEnum('status').default('draft').notNull()
```

**Why:** Type-safe at database level, prevents invalid values

---

### JSONB for Flexible Data

```typescript
metadata: jsonb('metadata')

// With TypeScript interface:
export interface Metadata {
  customField?: string;
  tags?: string[];
}
```

**Use Cases:** Extensible data, user preferences, dynamic configurations

---

### Flexible Date Fields

```typescript
// For historical/approximate dates
date: text('date'), // "circa 1940s" or "Spring 1985"
dateExact: timestamp('date_exact', { mode: 'date' }), // Sortable exact date
```

**Pattern:** Text for display, timestamp for sorting/filtering

---

### Indexes for Performance

```typescript
(table) => ({
  emailIdx: { columns: [table.email] },
  createdAtIdx: { columns: [table.createdAt] },
})
```

**Best Practice:** Index foreign keys, frequently queried fields, and sort columns

---

### Composite Unique Constraints

```typescript
(table) => ({
  uniqueUserEmail: { columns: [table.userId, table.email] },
})
```

**Use Case:** Ensure unique combinations (e.g., one email per user)

---

## Usage Examples

### In Next.js Server Components

```typescript
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export default async function PostsPage() {
  // Fetch all posts, ordered by creation date
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      {allPosts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

---

### In Server Actions

```typescript
'use server'

import { db } from '@/db';
import { posts, type NewPost } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createPost(data: Omit<NewPost, 'id' | 'createdAt' | 'updatedAt'>) {
  await db.insert(posts).values(data);
  revalidatePath('/posts');
}

export async function updatePost(id: string, data: Partial<NewPost>) {
  await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id));
  revalidatePath('/posts');
}

export async function deletePost(id: string) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath('/posts');
}
```

---

### With Authentication (Clerk Example)

```typescript
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function MyPostsPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in</div>;
  }

  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, userId));

  return <div>{/* render posts */}</div>;
}
```

---

### Complex Queries with Joins

```typescript
import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Join posts with users
const postsWithAuthors = await db
  .select({
    post: posts,
    author: users,
  })
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id));
```

---

## Development Workflow

### Option 1: Quick Iteration (db:push)

Best for rapid prototyping and local development:

```bash
# 1. Edit src/db/schema.ts
# 2. Push changes directly to database
pnpm db:push
```

**Pros:** Fast, no migration files to manage
**Cons:** No migration history, can't roll back changes

---

### Option 2: Tracked Migrations (db:generate + db:migrate)

Best for production and team environments:

```bash
# 1. Edit src/db/schema.ts
# 2. Generate migration file
pnpm db:generate

# 3. Review generated SQL in drizzle/migrations/
# 4. Apply migration
pnpm db:migrate
```

**Pros:** Full history, reviewable SQL, reversible
**Cons:** More steps, migration files to commit

---

### Visual Database Browser

```bash
pnpm db:studio
```

Opens Drizzle Studio in your browser for visual data exploration and editing.

---

## Environment Setup

### Neon Setup

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string (starts with `postgresql://`)
4. Add to `.env.local`:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### Path Aliases (Next.js / TypeScript)

Ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This enables `import { db } from '@/db'` instead of relative paths.

---

## Troubleshooting

### "DATABASE_URL is not defined"

- Check `.env.local` exists and is in project root
- Restart dev server after adding environment variables
- Verify `dotenv` is loading correct file in `drizzle.config.ts`

### "Cannot find module '@/db'"

- Ensure `tsconfig.json` has `@/*` path alias configured
- Restart TypeScript server in your editor

### "Type error: Property 'xyz' does not exist"

- Run `pnpm db:generate` to sync types with schema
- Restart TypeScript server

### Schema changes not reflecting

```bash
pnpm db:push  # Force push (development only)
```

### Migration conflicts

```bash
# Delete generated migrations and start fresh (development only)
rm -rf drizzle/migrations
pnpm db:generate
```

---

## Best Practices

1. **Always validate environment variables** at module load time
2. **Use enums** for fixed value sets (status, role, type)
3. **Index foreign keys** and frequently queried fields
4. **Use cascade deletes** thoughtfully (data integrity vs data preservation)
5. **Export types** for every table (`type Post`, `type NewPost`)
6. **Use JSONB sparingly** - prefer structured columns when possible
7. **Name conventions**: `camelCase` in TypeScript, `snake_case` in SQL
8. **Timestamp mode**: Use `{ mode: 'date' }` for JavaScript Date objects
9. **Use `notNull()`** unless field is genuinely optional
10. **Review generated SQL** before applying migrations in production

---

## Next Steps

- Add more tables to your schema
- Implement relations between tables
- Set up database seeding scripts
- Configure database backups (Neon has automatic backups)
- Set up staging/production branches in Neon
- Add validation with Zod schemas

---

## Resources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Neon Documentation](https://neon.tech/docs)
- [Drizzle with Next.js Guide](https://orm.drizzle.team/docs/get-started-postgresql#nextjs)
- [Drizzle Schema Reference](https://orm.drizzle.team/docs/sql-schema-declaration)
- [Neon + Drizzle Quickstart](https://neon.tech/docs/guides/drizzle)

---

**Template Version:** 1.0
**Last Updated:** 2025-01
**Compatible With:** Next.js 14+, Drizzle 0.44+, Node 18+
