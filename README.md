# Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with best practices architecture.

## Project Structure

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── ui/            # UI components (buttons, inputs, etc.)
│   └── layout/        # Layout components (header, footer, etc.)
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
├── store/             # Global state management
├── types/             # TypeScript type definitions
└── constants/         # Application constants
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ ESLint
- ✅ Organized folder structure
- ✅ Path aliases (@/*)
- ✅ Best practices architecture

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking