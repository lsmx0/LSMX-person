# LSMX — Hand-drawn Personal Website

A fully hand-drawn style personal website built with Next.js 14 + Tailwind CSS + Rough.js + Framer Motion.

## Features

- **Hand-drawn UI** — Rough.js powered borders with line growth animations
- **Dark/Light mode** — Colorful sketch lines with proper contrast
- **i18n** — Chinese & English with automatic browser detection (next-intl)
- **Blog** — MDX with syntax highlighting in hand-drawn code blocks
- **Projects** — Card grid with GIF/Video preview support
- **Guestbook** — Supabase-powered message board
- **Responsive** — Mobile single-column, tablet side-by-side, desktop centered

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

Run the SQL script in your Supabase SQL Editor:

```bash
supabase/create-messages.sql
```

## Content

- Blog posts: `content/blog/{zh,en}/*.mdx`
- Projects: `content/projects/{zh,en}/*.mdx`

## Docker Deployment

```bash
docker build -t lsmx-person \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your-url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key .
docker run -p 3000:3000 lsmx-person
```

## Tech Stack

Next.js 14 · Tailwind CSS · Rough.js · Framer Motion · Lucide React · next-intl · next-themes · Supabase · next-mdx-remote · rehype-pretty-code
